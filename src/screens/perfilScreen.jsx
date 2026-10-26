import { StyleSheet, Text, View } from "react-native";

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>CUENTA</Text>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.subtitle}>Consulta y actualiza los datos de tu cuenta.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 22, backgroundColor: "#f4f7f6" },
  label: { color: "#176b61", fontSize: 10, fontWeight: "800", letterSpacing: 1.2, marginBottom: 6 },
  title: { color: "#163d3b", fontSize: 25, fontWeight: "800" },
  subtitle: { color: "#789088", fontSize: 13, marginTop: 8 },
});
