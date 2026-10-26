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

async function configurarCanalAndroid() {
  if (Platform.OS !== "android") {
    return;
  }

  await Notifications.setNotificationChannelAsync("default", {
    name: "Avisos de solicitudes",
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
  });
}

export default function NotificacionesPush() {
  const [token, setToken] = useState("");
  const [ultimoAviso, setUltimoAviso] = useState("Sin notificaciones");
  const [estado, setEstado] = useState("Pendiente");
  const [mostrarToken, setMostrarToken] = useState(false);

  useEffect(() => {
    let activa = true;

    configurarCanalAndroid().catch((error) => {
      console.error("No se pudo configurar el canal de notificaciones:", error);
    });

    const recibida = Notifications.addNotificationReceivedListener((n) => {
      if (activa) {
        setUltimoAviso(n.request.content.title || "Notificación recibida");
      }
    });
    const pulsada = Notifications.addNotificationResponseReceivedListener(
      (r) => {
        if (activa) {
          setUltimoAviso(
            r.notification.request.content.title || "Notificación pulsada",
          );
        }
        console.log("Datos al pulsar:", r.notification.request.content.data);
      },
    );

    Notifications.getLastNotificationResponseAsync()
      .then((response) => {
        if (activa && response) {
          setUltimoAviso(
            response.notification.request.content.title ||
              "Notificación pulsada",
          );
        }
      })
      .catch((error) => {
        console.error("No se pudo leer la notificación inicial:", error);
      });

    return () => {
      activa = false;
      recibida.remove();
      pulsada.remove();
    };
  }, []);

  async function registrarDispositivo() {
    try {
      await configurarCanalAndroid();
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
      const permisos = await Notifications.getPermissionsAsync();
      if (!permisos.granted) {
        setEstado("Concede permisos antes de probar la notificación local");
        Alert.alert(
          "Permisos requeridos",
          "Pulsa primero «Solicitar permisos y obtener token».",
        );
        return;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Solicitud registrada",
          body: "Tu solicitud fue registrada correctamente.",
          sound: "default",
          channelId: "default",
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
    <ScrollView style={{ backgroundColor: "#f5f7f5" }} contentContainerStyle={{ padding: 20, gap: 14 }}>
      <Text style={{ color: "#11145b", fontSize: 10, fontWeight: "800", letterSpacing: 1 }}>CENTRO DE AVISOS</Text>
      <Text style={{ color: "#11145b", fontSize: 26, fontWeight: "900" }}>Notificaciones</Text>
      <Text style={{ color: "#7b8495", fontSize: 12 }}>Administra permisos y prueba tus avisos push.</Text>
      <Button
        title="Solicitar permisos y obtener token"
        onPress={registrarDispositivo}
      />
      <Text style={{ color: "#25285e", fontWeight: "700" }}>Estado: {estado}</Text>
      <Text style={{ backgroundColor: "#fff", borderRadius: 10, padding: 13, color: "#596477" }} selectable>
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
      <Text style={{ color: "#7b8495", fontSize: 11, lineHeight: 16 }}>
        La prueba local la programa el teléfono. La push remota se envía desde
        Expo usando este Expo Push Token.
      </Text>
      <Text style={{ color: "#25285e", fontWeight: "700" }}>Último aviso: {ultimoAviso}</Text>
    </ScrollView>
  );
}
