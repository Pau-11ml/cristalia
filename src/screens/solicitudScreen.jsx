import { useMemo, useState } from "react";
import * as Notifications from "expo-notifications";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { supabase } from "../lib/supabase";

export default function SolicitudScreen({ onNavigate }) {
  const [cliente, setCliente] = useState("");
  const [trabajo, setTrabajo] = useState("");
  const [ancho, setAncho] = useState("1,20");
  const [alto, setAlto] = useState("1,50");
  const [cantidad, setCantidad] = useState("2");
  const [vidrio, setVidrio] = useState("Vidrio claro de 6 mm");
  const [perfil, setPerfil] = useState("Natural");
  const [guardando, setGuardando] = useState(false);

  const valores = useMemo(() => {
    const anchoNumero = Number(ancho.replace(",", "."));
    const altoNumero = Number(alto.replace(",", "."));
    const cantidadNumero = Number(cantidad);
    const area = anchoNumero * altoNumero * cantidadNumero;
    const vidrioTotal = area * 35;
    const perfilTotal = (anchoNumero + altoNumero) * 2 * cantidadNumero * 12;
    const manoDeObra = cantidadNumero * 45;

    return {
      anchoNumero,
      altoNumero,
      cantidadNumero,
      vidrioTotal,
      perfilTotal,
      manoDeObra,
      total: vidrioTotal + perfilTotal + manoDeObra,
    };
  }, [ancho, alto, cantidad]);

  const guardarCotizacion = async () => {
    const { anchoNumero, altoNumero, cantidadNumero, total } = valores;

    if (!cliente.trim() || !trabajo.trim() || !vidrio.trim() || !perfil.trim()) {
      Alert.alert("Datos incompletos", "Completa todos los campos de la cotización.");
      return;
    }

    if (
      !Number.isFinite(anchoNumero) ||
      anchoNumero <= 0 ||
      !Number.isFinite(altoNumero) ||
      altoNumero <= 0 ||
      !Number.isInteger(cantidadNumero) ||
      cantidadNumero <= 0
    ) {
      Alert.alert("Datos inválidos", "Ancho, alto y cantidad deben ser valores mayores que cero.");
      return;
    }

    if (guardando) {
      return;
    }

    try {
      setGuardando(true);
      const { data, error } = await supabase
        .from("cotizaciones")
        .insert({
          cliente: cliente.trim(),
          trabajo: trabajo.trim(),
          ancho: anchoNumero,
          alto: altoNumero,
          cantidad: cantidadNumero,
          vidrio: vidrio.trim(),
          perfil: perfil.trim(),
          total: Number(total.toFixed(2)),
        })
        .select("id")
        .single();

      if (error) {
        throw error;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Solicitud registrada",
          body: "Tu solicitud se guardó correctamente.",
          sound: "default",
          channelId: "default",
          data: { tipo: "solicitud_creada", id: data.id },
        },
        trigger: null,
      });

      Alert.alert("Cotización guardada", "La solicitud se registró correctamente.");
      onNavigate("inicio");
    } catch (error) {
      console.error("Error al guardar la cotización:", error);
      Alert.alert(
        "No se pudo guardar",
        "La solicitud no se registró. Revisa la conexión y las políticas de Supabase.",
      );
    } finally {
      setGuardando(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Pressable onPress={() => onNavigate("inicio")}><Text style={styles.back}>‹  Volver</Text></Pressable>
      <Text style={styles.label}>COTIZACIONES</Text>
      <Text style={styles.title}>Crear cotización</Text>
      <Text style={styles.subtitle}>Completa los datos para calcular el precio.</Text>
      <Text style={styles.section}>¿Para quién es?</Text>
      <Text style={styles.fieldLabel}>Nombre del cliente</Text>
      <TextInput style={styles.input} value={cliente} onChangeText={setCliente} placeholder="María Zambrano" placeholderTextColor="#a0a6b0" />
      <Text style={styles.fieldLabel}>Nombre del trabajo</Text>
      <TextInput style={styles.input} value={trabajo} onChangeText={setTrabajo} placeholder="Ventanas de aluminio" placeholderTextColor="#a0a6b0" />
      <Text style={styles.section}>Medidas de ventana</Text>
      <View style={styles.columns}><Field label="Ancho (m)" value={ancho} onChangeText={setAncho} /><Field label="Alto (m)" value={alto} onChangeText={setAlto} /></View>
      <Text style={styles.fieldLabel}>Cantidad de ventanas</Text>
      <TextInput style={styles.input} value={cantidad} onChangeText={setCantidad} placeholder="2" placeholderTextColor="#a0a6b0" keyboardType="numeric" />
      <Text style={styles.section}>¿Qué vas a usar?</Text>
      <Field label="Vidrio" value={vidrio} onChangeText={setVidrio} full />
      <Field label="Perfil de aluminio" value={perfil} onChangeText={setPerfil} full />
      <Text style={styles.section}>Así se calcula</Text>
      <View style={styles.calculation}>
        <Text style={styles.calcLine}>Vidrio · {formatMoney(valores.vidrioTotal)}</Text>
        <Text style={styles.calcLine}>Perfil · {formatMoney(valores.perfilTotal)}</Text>
        <Text style={styles.calcLine}>Mano de obra · {formatMoney(valores.manoDeObra)}</Text>
        <View style={styles.total}><Text style={styles.totalText}>Total · {cantidadNumeroTexto(cantidad)}</Text><Text style={styles.totalPrice}>{formatMoney(valores.total)}</Text></View>
      </View>
      <Pressable style={[styles.saveButton, guardando && styles.saveButtonDisabled]} disabled={guardando} onPress={guardarCotizacion}><Text style={styles.saveText}>{guardando ? "Guardando..." : "✓  Guardar cotización"}</Text></Pressable>
      <Text style={styles.note}>La notificación se mostrará solo después de confirmar el guardado en Supabase.</Text>
    </ScrollView>
  );
}

function Field({ label, value, onChangeText, full }) {
  return <View style={[styles.field, full && styles.fieldFull]}><Text style={styles.fieldLabel}>{label}</Text><TextInput style={styles.input} value={value} onChangeText={onChangeText} /></View>;
}

function formatMoney(value) {
  return `USD ${value.toFixed(2).replace(".", ",")}`;
}

function cantidadNumeroTexto(value) {
  const cantidad = Number(value);
  return Number.isInteger(cantidad) && cantidad > 0 ? `${cantidad} ventanas` : "ventanas";
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
  saveButton: { backgroundColor: "#11145b", borderRadius: 10, padding: 14, alignItems: "center", marginTop: 18 }, saveButtonDisabled: { opacity: 0.6 }, saveText: { color: "#fff", fontWeight: "800", fontSize: 13 }, note: { color: "#98a2b3", fontSize: 10, lineHeight: 15, marginTop: 10 },
});
