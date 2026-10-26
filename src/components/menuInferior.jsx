import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function MenuInferior({ pantallaActual, cambiarPantalla }) {
    return (
        <View style={styles.menu}>
            <Pressable
                style={[styles.boton, pantallaActual === 'inicio' && styles.botonActivo]}
                onPress={() => cambiarPantalla('inicio')}
            >
                <Text style={styles.icono}>⌂</Text><Text style={[styles.texto, pantallaActual === 'inicio' && styles.textoActivo]}>Inicio</Text>
            </Pressable>

            <Pressable
                style={[styles.boton, pantallaActual === 'solicitudes' && styles.botonActivo]}
                onPress={() => cambiarPantalla('solicitudes')}
            >
                <Text style={styles.icono}>▧</Text><Text style={[styles.texto, pantallaActual === 'solicitudes' && styles.textoActivo]}>Trabajos</Text>
            </Pressable>

            <Pressable
                style={[styles.boton, pantallaActual === 'ubicacion' && styles.botonActivo]}
                onPress={() => cambiarPantalla('ubicacion')}
            >
                <Text style={styles.icono}>⌖</Text><Text style={[styles.texto, pantallaActual === 'ubicacion' && styles.textoActivo]}>Ubicación</Text>
            </Pressable>

            <Pressable
                style={[styles.boton, pantallaActual === 'perfil' && styles.botonActivo]}
                onPress={() => cambiarPantalla('perfil')}
            >
                <Text style={styles.icono}>◌</Text><Text style={[styles.texto, pantallaActual === 'perfil' && styles.textoActivo]}>Perfil</Text>
            </Pressable>

            <Pressable
                style={[styles.boton, pantallaActual === 'notificaciones' && styles.botonActivo]}
                onPress={() => cambiarPantalla('notificaciones')}
            >
                <Text style={styles.icono}>♢</Text><Text style={[styles.texto, pantallaActual === 'notificaciones' && styles.textoActivo]}>Avisos</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    boton: {
        paddingVertical: 6,
        paddingHorizontal: 6,
        borderRadius: 8,
        alignItems: 'center',
    },
    botonActivo: {
        backgroundColor: '#eff6ff',
    },
    texto: {
        fontSize: 9,
        color: '#7b8495',
        fontWeight: '500',
    },
    textoActivo: {
        color: '#11145b',
        fontWeight: 'bold',
    },
    icono: { color: '#9aa2b2', fontSize: 16, marginBottom: 2 },
});