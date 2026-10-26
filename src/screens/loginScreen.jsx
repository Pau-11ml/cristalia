import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen({ onLogin }) {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");

  const correoCorrecto = "danna@uleam.edu.ec";
  const claveCorrecta = "paulina";

  const iniciarSesion = () => {
    const correoIngresado = correo.trim().toLowerCase();
    const claveIngresada = clave.trim();

    if (!correoIngresado || !claveIngresada) {
      Alert.alert(
        "Datos incompletos",
        "Por favor ingresa tu correo y contraseña.",
      );
      return;
    }

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreo.test(correoIngresado)) {
      Alert.alert(
        "Correo inválido",
        "Ingresa un correo electrónico con un formato válido.",
      );
      return;
    }

    if (
      correoIngresado === correoCorrecto &&
      claveIngresada === claveCorrecta
    ) {
      onLogin();
      return;
    }

    Alert.alert(
      "Credenciales incorrectas",
      "El correo o la contraseña son incorrectos.",
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.brandMark}>
        <Text style={styles.brandMarkText}>C</Text>
      </View>
      <Text style={styles.label}>CRISTALIA / SISTEMA DE GESTIÓN</Text>
      <Text style={styles.title}>Bienvenido de nuevo</Text>
      <Text style={styles.subtitle}>
        Administra tus cotizaciones y trabajos desde un solo lugar.
      </Text>
      <Text style={styles.fieldLabel}>Correo electrónico</Text>
      <TextInput
        style={styles.input}
        value={correo}
        onChangeText={setCorreo}
        placeholder="prueba@uleam.edu.ec"
        placeholderTextColor="#9aa3b5"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text style={styles.fieldLabel}>Contraseña</Text>
      <TextInput
        style={styles.input}
        value={clave}
        onChangeText={setClave}
        placeholder="Contraseña"
        placeholderTextColor="#9aa3b5"
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={iniciarSesion}>
        <Text style={styles.buttonText}>Ingresar a Cristalia</Text>
      </Pressable>
      <Text style={styles.hint}>Usa tus credenciales institucionales.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 28,
    backgroundColor: "#f5f7f5",
  },
  brandMark: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#11145b",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },
  brandMarkText: { color: "#fff", fontSize: 28, fontWeight: "900" },
  label: {
    color: "#11145b",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  title: { color: "#11145b", fontSize: 29, fontWeight: "900" },
  subtitle: {
    color: "#667085",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 9,
    marginBottom: 26,
  },
  fieldLabel: {
    color: "#30345c",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 7,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#e5e7eb",
    borderWidth: 1,
    borderRadius: 11,
    padding: 14,
    marginBottom: 16,
    color: "#20245b",
  },
  button: {
    backgroundColor: "#11145b",
    borderRadius: 11,
    padding: 15,
    alignItems: "center",
    marginTop: 4,
  },
  buttonText: { color: "#fff", fontWeight: "800", fontSize: 14 },
  hint: { color: "#98a2b3", fontSize: 11, textAlign: "center", marginTop: 16 },
});
