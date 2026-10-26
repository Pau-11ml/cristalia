import { StyleSheet, Text, View } from "react-native";

export default function InicioScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>CRISTALIA</Text>
      <Text style={styles.title}>Inicio</Text>
      <Text style={styles.subtitle}>Administra tus cotizaciones y registra la ubicación de cada obra.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 22, backgroundColor: "#f4f7f6" },
  label: { color: "#176b61", fontSize: 10, fontWeight: "800", letterSpacing: 1.2, marginBottom: 6 },
  title: { color: "#163d3b", fontSize: 25, fontWeight: "800" },
  subtitle: { color: "#789088", fontSize: 13, marginTop: 8 },
});
