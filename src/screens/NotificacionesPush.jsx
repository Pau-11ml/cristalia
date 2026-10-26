import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Alert, Button, Platform, ScrollView, Text } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function NotificacionesPush() {
  const [token, setToken] = useState("");
  const [ultimoAviso, setUltimoAviso] = useState("Sin notificaciones");
  const [estado, setEstado] = useState("Pendiente");
  const [mostrarToken, setMostrarToken] = useState(false);

  useEffect(() => {
    const recibida = Notifications.addNotificationReceivedListener((n) => {
      setUltimoAviso(n.request.content.title || "Notificación recibida");
    });
    const pulsada = Notifications.addNotificationResponseReceivedListener(
      (r) => {
        setUltimoAviso(
          r.notification.request.content.title || "Notificación pulsada",
        );
        console.log("Datos al pulsar:", r.notification.request.content.data);
      },
    );
    return () => {
      recibida.remove();
      pulsada.remove();
    };
  }, []);

  async function registrarDispositivo() {
    try {
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "Avisos de solicitudes",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
        });
      }
      if (!Device.isDevice) {
        setEstado("La prueba push requiere un dispositivo físico");
        return;
      }
      const actual = await Notifications.getPermissionsAsync();
      let concedido = actual.granted;
      if (!concedido) {
        const nuevo = await Notifications.requestPermissionsAsync();
        concedido = nuevo.granted;
      }
      if (!concedido) {
        setEstado("Permiso denegado; revisar ajustes del teléfono");
        return;
      }
      const projectId =
        Constants.expoConfig?.extra?.eas?.projectId ??
        Constants.easConfig?.projectId;
      if (!projectId) throw new Error("Falta extra.eas.projectId");
      const resultado = await Notifications.getExpoPushTokenAsync({
        projectId,
      });
      setToken(resultado.data);
      setMostrarToken(false);
      setEstado("Token obtenido correctamente");
    } catch (e) {
      const mensaje = e instanceof Error ? e.message : "Error desconocido";
      setEstado("Error: " + mensaje);
      Alert.alert("Registro fallido", mensaje);
    }
  }

  async function probarNotificacionLocal() {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Solicitud registrada",
          body: "Tu solicitud fue registrada correctamente.",
          data: { pantalla: "solicitudes", tipo: "registro" },
        },
        trigger: null,
      });
    } catch (e) {
      const mensaje = e instanceof Error ? e.message : "Error desconocido";
      Alert.alert("Error local", mensaje);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 22, gap: 14 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>Notificaciones</Text>
      <Button
        title="Solicitar permisos y obtener token"
        onPress={registrarDispositivo}
      />
      <Text>Estado: {estado}</Text>
      <Text selectable>
        Expo Push Token:{" "}
        {token
          ? mostrarToken
            ? token
            : `${token.slice(0, 20)}...${token.slice(-6)}`
          : "Aún no disponible"}
      </Text>
      {token ? (
        <Button
          title={mostrarToken ? "Ocultar token" : "Mostrar token completo"}
          onPress={() => setMostrarToken((visible) => !visible)}
        />
      ) : null}
      <Button
        title="Probar notificación local"
        onPress={probarNotificacionLocal}
      />
      <Text>Último aviso: {ultimoAviso}</Text>
    </ScrollView>
  );
}
