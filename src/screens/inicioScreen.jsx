import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function InicioScreen({ onNavigate }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>▣  CRISTALIA</Text>
      <Text style={styles.title}>Tu taller, al día</Text>
      <Text style={styles.subtitle}>Manta · lunes, 26 de octubre de 2026</Text>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>De las medidas al precio, sin complicarte.</Text>
        <Text style={styles.heroText}>Calcula materiales y mano de obra en una sola cotización.</Text>
        <Pressable style={styles.heroButton} onPress={() => onNavigate("solicitudes")}>
          <Text style={styles.heroButtonText}>＋  Crear cotización</Text>
        </Pressable>
      </View>
      <Text style={styles.sectionTitle}>Así va tu taller</Text>
      <Text style={styles.muted}>01–16 oct 2026 · Valores en USD</Text>
      <View style={styles.summary}>
        <Row label="Cotizado" value="USD 2.545,60" />
        <Row label="Cobrado" value="USD 1.750,00" />
        <Row label="Pendiente" value="USD 795,60" strong />
      </View>
      <Text style={styles.sectionTitle}>¿Qué necesitas hacer?</Text>
      <View style={styles.actionRow}>
        <Action title="Trabajos" onPress={() => onNavigate("solicitudes")} />
        <Action title="Reportes" onPress={() => onNavigate("perfil")} />
      </View>
      <Text style={styles.sectionTitle}>Un trabajo en marcha</Text>
      <View style={styles.workCard}>
        <View style={styles.workHeader}><Text style={styles.muted}>COT-024</Text><Text style={styles.badge}>En proceso</Text></View>
        <Text style={styles.customer}>María Zambrano</Text>
        <Text style={styles.muted}>Ventanas de aluminio</Text>
        <Text style={styles.balance}>Saldo por cobrar  <Text style={styles.balanceValue}>USD 195,60</Text></Text>
        <Text style={styles.link}>Ver trabajo  →</Text>
      </View>
    </ScrollView>
  );
}

function Row({ label, value, strong }) {
  return <View style={styles.row}><Text style={styles.rowLabel}>{label}</Text><Text style={[styles.rowValue, strong && styles.strong]}>{value}</Text></View>;
}

function Action({ title, onPress }) {
  return <Pressable style={styles.action} onPress={onPress}><Text style={styles.actionIcon}>▧</Text><Text style={styles.actionText}>{title}</Text></Pressable>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7f5" },
  content: { padding: 20, paddingBottom: 30 },
  label: { color: "#11145b", fontSize: 10, fontWeight: "800", letterSpacing: 1, marginBottom: 8 },
  title: { color: "#11145b", fontSize: 26, fontWeight: "900" },
  subtitle: { color: "#7b8495", fontSize: 11, marginTop: 5, marginBottom: 20 },
  hero: { backgroundColor: "#11145b", borderRadius: 12, padding: 14, marginBottom: 21 },
  heroTitle: { color: "#fff", fontSize: 16, lineHeight: 21, fontWeight: "800", maxWidth: 230 },
  heroText: { color: "#d9dcff", fontSize: 10, marginTop: 8, marginBottom: 14 },
  heroButton: { backgroundColor: "#fff", borderRadius: 8, padding: 11, alignItems: "center" },
  heroButtonText: { color: "#11145b", fontSize: 12, fontWeight: "700" },
  sectionTitle: { color: "#1d2257", fontSize: 14, fontWeight: "800", marginTop: 3, marginBottom: 5 },
  muted: { color: "#8b93a1", fontSize: 10 },
  summary: { backgroundColor: "#fff", borderRadius: 11, padding: 11, marginTop: 8, marginBottom: 19 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: "#f0f1f3" },
  rowLabel: { color: "#647084", fontSize: 11 }, rowValue: { color: "#25285e", fontSize: 11 }, strong: { fontWeight: "900" },
  actionRow: { flexDirection: "row", gap: 8, marginTop: 7, marginBottom: 19 },
  action: { flex: 1, backgroundColor: "#fff", borderRadius: 10, padding: 14, alignItems: "center", borderWidth: 1, borderColor: "#e8e9eb" },
  actionIcon: { color: "#11145b", fontSize: 18 }, actionText: { color: "#282b5d", fontSize: 10, fontWeight: "700", marginTop: 6 },
  workCard: { backgroundColor: "#fff", borderRadius: 11, padding: 12, marginTop: 7, borderWidth: 1, borderColor: "#e8e9eb" },
  workHeader: { flexDirection: "row", justifyContent: "space-between" }, badge: { backgroundColor: "#11145b", color: "#fff", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, fontSize: 9 },
  customer: { color: "#20245b", fontSize: 12, fontWeight: "800", marginTop: 10 }, balance: { color: "#596477", fontSize: 11, marginTop: 12 }, balanceValue: { color: "#20245b", fontWeight: "900" }, link: { color: "#11145b", fontSize: 10, fontWeight: "700", marginTop: 10 },
});
