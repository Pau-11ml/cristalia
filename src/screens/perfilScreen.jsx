import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>CUENTA</Text>
      <Text style={styles.title}>Tu perfil</Text>
      <Text style={styles.subtitle}>Consulta y actualiza los datos de tu cuenta.</Text>
      <View style={styles.card}>
        <View style={styles.avatar}><Text style={styles.avatarText}>MZ</Text></View>
        <Text style={styles.name}>María Zambrano</Text>
        <Text style={styles.email}>maria@cristalia.ec</Text>
      </View>
      <Pressable style={styles.option}><Text style={styles.optionTitle}>Datos de la cuenta</Text><Text style={styles.arrow}>›</Text></Pressable>
      <Pressable style={styles.option}><Text style={styles.optionTitle}>Preferencias de notificaciones</Text><Text style={styles.arrow}>›</Text></Pressable>
      <Text style={styles.caption}>Las notificaciones push se administran desde la sección Avisos.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f7f5" },
  label: { color: "#11145b", fontSize: 10, fontWeight: "800", letterSpacing: 1.2, marginBottom: 6 },
  title: { color: "#11145b", fontSize: 25, fontWeight: "900" },
  subtitle: { color: "#7b8495", fontSize: 12, marginTop: 7, marginBottom: 20 },
  card: { backgroundColor: "#11145b", borderRadius: 12, padding: 16, alignItems: "center", marginBottom: 16 },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: "#dce3ff", alignItems: "center", justifyContent: "center", marginBottom: 8 },
  avatarText: { color: "#11145b", fontWeight: "900", fontSize: 17 }, name: { color: "#fff", fontSize: 15, fontWeight: "800" }, email: { color: "#d9dcff", fontSize: 11, marginTop: 4 },
  option: { backgroundColor: "#fff", borderRadius: 10, padding: 15, marginBottom: 9, flexDirection: "row", justifyContent: "space-between", borderWidth: 1, borderColor: "#e8e9eb" },
  optionTitle: { color: "#25285e", fontSize: 12, fontWeight: "700" }, arrow: { color: "#11145b", fontSize: 20, lineHeight: 14 }, caption: { color: "#98a2b3", fontSize: 10, marginTop: 7 },
});
