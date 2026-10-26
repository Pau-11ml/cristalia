import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function LoginScreen({ onLogin }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>CRISTALIA</Text>
      <Text style={styles.title}>Iniciar sesión</Text>
      <Text style={styles.subtitle}>Ingresa para administrar tus cotizaciones.</Text>
      <TextInput style={styles.input} placeholder="Correo electrónico" keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry />
      <Pressable style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#f4f7f6" },
  label: { color: "#176b61", fontSize: 12, fontWeight: "800", letterSpacing: 1.5, marginBottom: 8 },
  title: { color: "#163d3b", fontSize: 28, fontWeight: "800" },
  subtitle: { color: "#789088", fontSize: 14, marginTop: 8, marginBottom: 24 },
  input: { backgroundColor: "#fff", borderRadius: 10, padding: 14, marginBottom: 12 },
  button: { backgroundColor: "#176b61", borderRadius: 10, padding: 14, alignItems: "center", marginTop: 4 },
  buttonText: { color: "#fff", fontWeight: "800", fontSize: 14 },
});
