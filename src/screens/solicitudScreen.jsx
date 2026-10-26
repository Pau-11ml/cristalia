import { StyleSheet, Text, View } from "react-native";

export default function SolicitudScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>COTIZACIONES</Text>
      <Text style={styles.title}>Solicitudes</Text>
      <Text style={styles.subtitle}>Aquí aparecerán tus solicitudes de cotización.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 22, backgroundColor: "#f4f7f6" },
  label: { color: "#176b61", fontSize: 10, fontWeight: "800", letterSpacing: 1.2, marginBottom: 6 },
  title: { color: "#163d3b", fontSize: 25, fontWeight: "800" },
  subtitle: { color: "#789088", fontSize: 13, marginTop: 8 },
});
