import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function SolicitudScreen({ onNavigate }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Pressable onPress={() => onNavigate("inicio")}><Text style={styles.back}>‹  Volver</Text></Pressable>
      <Text style={styles.label}>COTIZACIONES</Text>
      <Text style={styles.title}>Crear cotización</Text>
      <Text style={styles.subtitle}>Completa los datos para calcular el precio.</Text>
      <Text style={styles.section}>¿Para quién es?</Text>
      <Text style={styles.fieldLabel}>Nombre del cliente</Text>
      <TextInput style={styles.input} placeholder="María Zambrano" placeholderTextColor="#a0a6b0" />
      <Text style={styles.fieldLabel}>Nombre del trabajo</Text>
      <TextInput style={styles.input} placeholder="Ventanas de aluminio" placeholderTextColor="#a0a6b0" />
      <Text style={styles.section}>Medidas de ventana</Text>
      <View style={styles.columns}><Field label="Ancho (m)" value="1,20" /><Field label="Alto (m)" value="1,50" /></View>
      <Text style={styles.fieldLabel}>Cantidad de ventanas</Text>
      <TextInput style={styles.input} placeholder="2" placeholderTextColor="#a0a6b0" keyboardType="numeric" />
      <Text style={styles.section}>¿Qué vas a usar?</Text>
      <Field label="Vidrio" value="Vidrio claro de 6 mm" full />
      <Field label="Perfil de aluminio" value="Natural" full />
      <Text style={styles.section}>Así se calcula</Text>
      <View style={styles.calculation}>
        <Text style={styles.calcLine}>Vidrio · 1,80 m² × USD 35 <Text style={styles.price}>USD 63,00</Text></Text>
        <Text style={styles.calcLine}>Perfil · 5,40 m × USD 12 <Text style={styles.price}>USD 64,80</Text></Text>
        <Text style={styles.calcLine}>Mano de obra <Text style={styles.price}>USD 45,00</Text></Text>
        <View style={styles.total}><Text style={styles.totalText}>Total · 2 ventanas</Text><Text style={styles.totalPrice}>USD 345,60</Text></View>
      </View>
      <Pressable style={styles.saveButton} onPress={() => onNavigate("inicio")}><Text style={styles.saveText}>✓  Guardar cotización</Text></Pressable>
      <Text style={styles.note}>La notificación se mostrará cuando el guardado real de la API confirme la solicitud.</Text>
    </ScrollView>
  );
}

function Field({ label, value, full }) {
  return <View style={[styles.field, full && styles.fieldFull]}><Text style={styles.fieldLabel}>{label}</Text><TextInput style={styles.input} defaultValue={value} /></View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7f5" }, content: { padding: 20, paddingBottom: 32 },
  back: { color: "#667085", fontSize: 11, marginBottom: 14 }, label: { color: "#11145b", fontSize: 10, fontWeight: "800", letterSpacing: 1, marginBottom: 6 },
  title: { color: "#11145b", fontSize: 25, fontWeight: "900" }, subtitle: { color: "#7b8495", fontSize: 12, marginTop: 6, marginBottom: 20 },
  section: { color: "#20245b", fontSize: 14, fontWeight: "800", marginTop: 8, marginBottom: 10 }, fieldLabel: { color: "#697386", fontSize: 10, marginBottom: 5 },
  input: { backgroundColor: "#fff", borderColor: "#e5e7eb", borderWidth: 1, borderRadius: 9, padding: 11, color: "#20245b", marginBottom: 12, fontSize: 12 },
  columns: { flexDirection: "row", gap: 8 }, field: { flex: 1 }, fieldFull: { flex: 0 },
  calculation: { backgroundColor: "#fff", borderRadius: 10, padding: 12, borderWidth: 1, borderColor: "#e8e9eb" }, calcLine: { color: "#687386", fontSize: 10, paddingVertical: 6 }, price: { color: "#25285e", fontWeight: "700" },
  total: { borderTopWidth: 1, borderTopColor: "#e7e9ef", marginTop: 5, paddingTop: 10, flexDirection: "row", justifyContent: "space-between" }, totalText: { color: "#25285e", fontSize: 11, fontWeight: "800" }, totalPrice: { color: "#11145b", fontSize: 12, fontWeight: "900" },
  saveButton: { backgroundColor: "#11145b", borderRadius: 10, padding: 14, alignItems: "center", marginTop: 18 }, saveText: { color: "#fff", fontWeight: "800", fontSize: 13 }, note: { color: "#98a2b3", fontSize: 10, lineHeight: 15, marginTop: 10 },
});
