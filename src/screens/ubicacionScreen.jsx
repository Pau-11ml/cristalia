import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function UbicacionScreen() {
  // 'pendiente' | 'concedido' | 'denegado' | 'bloqueado' (denegado sin poder volver a preguntar)
  const [permiso, setPermiso] = useState("pendiente");
  const [ubicacion, setUbicacion] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [siguiendo, setSiguiendo] = useState(false);

  // Guardamos la suscripción para poder cancelarla
  const suscripcion = useRef(null);

  // Al salir de la pantalla (App.js la desmonta al cambiar de pestaña)
  // cancelamos el seguimiento para no dejar el GPS encendido.
  useEffect(() => {
    return () => {
      suscripcion.current?.remove();
      suscripcion.current = null;
    };
  }, []);

  // Pide permiso y verifica que el GPS del teléfono esté encendido
  const prepararGPS = async () => {
    const respuesta = await Location.requestForegroundPermissionsAsync();

    if (!respuesta.granted) {
      setPermiso(respuesta.canAskAgain ? "denegado" : "bloqueado");
      Alert.alert(
        "Permiso denegado",
        "Cristalia necesita tu ubicación para registrar el lugar de la obra.",
      );
      return false;
    }

    setPermiso("concedido");

    const gpsEncendido = await Location.hasServicesEnabledAsync();
    if (!gpsEncendido) {
      Alert.alert("GPS apagado", "Activa la ubicación del teléfono e intenta de nuevo.");
      return false;
    }

    return true;
  };

  // Lectura única
  const obtenerUbicacion = async () => {
    try {
      setCargando(true);
      if (!(await prepararGPS())) return;

      const posicion = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setUbicacion(posicion);
    } catch (error) {
      Alert.alert("Error", "No se pudo obtener la ubicación");
    } finally {
      setCargando(false);
    }
  };

  // Lectura continua mientras la pantalla esté abierta
  const alternarSeguimiento = async () => {
    if (siguiendo) {
      suscripcion.current?.remove();
      suscripcion.current = null;
      setSiguiendo(false);
      return;
    }

    try {
      if (!(await prepararGPS())) return;

      suscripcion.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 5, // solo actualiza si te mueves 5 m
          timeInterval: 2000, // Android: mínimo 2 s entre lecturas
        },
        (posicion) => setUbicacion(posicion),
        (mensaje) => Alert.alert("Error de GPS", mensaje),
      );
      setSiguiendo(true);
    } catch (error) {
      Alert.alert("Error", "No se pudo iniciar el seguimiento");
    }
  };

  const coords = ubicacion?.coords;
  const precisionBaja = coords?.accuracy != null && coords.accuracy > 50;

  const formatear = (valor, decimales, unidad = "") =>
    valor == null ? "No disponible" : `${valor.toFixed(decimales)}${unidad}`;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contenido}>
      <Text style={styles.etiqueta}>SENSORES</Text>
      <Text style={styles.titulo}>Ubicación de la obra</Text>
      <Text style={styles.subtitulo}>
        Registra dónde se instalará el vidrio o aluminio para la cotización.
      </Text>

      {/* ESTADO DEL PERMISO */}
      <View style={styles.estado}>
        <Text style={styles.nombreDato}>Permiso de ubicación</Text>
        <Text style={styles.valorDato}>
          {permiso === "pendiente" && "Aún no solicitado"}
          {permiso === "concedido" && "Concedido"}
          {permiso === "denegado" && "Denegado"}
          {permiso === "bloqueado" && "Bloqueado: actívalo en Ajustes"}
        </Text>
      </View>

      {/* BOTONES */}
      <View style={styles.botones}>
        <Pressable
          style={[styles.boton, cargando && styles.botonInactivo]}
          onPress={obtenerUbicacion}
          disabled={cargando}
        >
          <Text style={styles.textoBoton}>
            {cargando ? "Buscando señal..." : "Obtener ubicación actual"}
          </Text>
        </Pressable>

        <Pressable
          style={[styles.boton, siguiendo && styles.botonDetener]}
          onPress={alternarSeguimiento}
        >
          <Text style={styles.textoBoton}>
            {siguiendo ? "Detener seguimiento" : "Seguir en tiempo real"}
          </Text>
        </Pressable>

        {permiso === "bloqueado" && (
          <Pressable
            style={[styles.boton, styles.botonSecundario]}
            onPress={() => Linking.openSettings()}
          >
            <Text style={styles.textoBotonSecundario}>Abrir ajustes</Text>
          </Pressable>
        )}
      </View>

      {/* DATOS DEL SENSOR */}
      {coords && (
        <View style={styles.tarjeta}>
          <Text style={styles.nombreArchivo}>
            {siguiendo ? "Lectura en vivo" : "Última lectura"}
          </Text>

          <Dato nombre="Latitud" valor={formatear(coords.latitude, 6, "°")} />
          <Dato nombre="Longitud" valor={formatear(coords.longitude, 6, "°")} />
          <Dato nombre="Precisión" valor={formatear(coords.accuracy, 0, " m")} />
          <Dato nombre="Altitud" valor={formatear(coords.altitude, 0, " m")} />
          <Dato
            nombre="Velocidad"
            valor={coords.speed == null ? "No disponible" : `${(coords.speed * 3.6).toFixed(1)} km/h`}
          />
          <Dato
            nombre="Hora"
            valor={new Date(ubicacion.timestamp).toLocaleTimeString()}
          />

          {precisionBaja && (
            <Text style={styles.aviso}>
              La precisión es baja (más de 50 m). Sal a un lugar abierto y vuelve a
              intentar antes de guardar esta posición.
            </Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}

function Dato({ nombre, valor }) {
  return (
    <View style={styles.fila}>
      <Text style={styles.nombreDato}>{nombre}</Text>
      <Text style={styles.valorDato}>{valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f7f6" },
  contenido: { padding: 22, paddingBottom: 30 },
  etiqueta: {
    color: "#176b61",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  titulo: { color: "#163d3b", fontSize: 25, fontWeight: "800" },
  subtitulo: { color: "#789088", fontSize: 13, marginTop: 8, marginBottom: 22 },
  estado: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  botones: { gap: 9, marginBottom: 15 },
  boton: {
    backgroundColor: "#176b61",
    borderRadius: 10,
    padding: 13,
    alignItems: "center",
  },
  botonInactivo: { opacity: 0.6 },
  botonDetener: { backgroundColor: "#b45309" },
  botonSecundario: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#176b61",
  },
  textoBoton: { color: "#fff", fontWeight: "800", fontSize: 13 },
  textoBotonSecundario: { color: "#176b61", fontWeight: "800", fontSize: 13 },
  tarjeta: { backgroundColor: "#fff", borderRadius: 10, padding: 12 },
  nombreArchivo: { color: "#24413e", fontWeight: "800", marginBottom: 8 },
  fila: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#eef3f1",
  },
  nombreDato: { color: "#789088", fontSize: 13 },
  valorDato: { color: "#24413e", fontSize: 13, fontWeight: "700" },
  aviso: { color: "#b45309", fontSize: 12, marginTop: 10 },
});
