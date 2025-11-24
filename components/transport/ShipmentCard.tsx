import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  id: string | number;
  title?: string;
  subtitle?: string;
  status?: string;
};

export default function ShipmentCard({ id, title, subtitle, status }: Props) {
  const router = useRouter();

  const handlePress = () => {
    const path = `/informacion_envio?id_asignacion=${id}`;
    router.push(path as any);
  };

  return (
    <Pressable onPress={handlePress} style={styles.link}>
      <View style={styles.cardWrapper}>
        <View style={styles.card}>

            {/* Franja azul curva a la izquierda */}
            <View style={styles.leftStripe} />

          {/* Contenido */}
          <View style={styles.content}>
            <Text style={styles.title}>{title ?? `Envío #${id}`}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

            {status && (
              <View style={styles.pillRow}>
                <View style={styles.pill}>
                  <Text style={styles.pillText}>{status}</Text>
                </View>
              </View>
            )}
          </View>

        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  link: { width: '100%' },

  cardWrapper: {
    marginVertical: 6,
    marginHorizontal: 16,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },

  /** Posiciona la curva azul a la izquierda */
  leftStripe: {
    width: 5,
    backgroundColor: '#0140CD',
    height: '100%',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },

  content: {
    flex: 1,
    padding: 16,
    paddingLeft: 26, // separa del borde azul
  },

  title: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
    color: '#111827',
  },

  subtitle: {
    color: '#6b7280',
    fontSize: 13,
    marginBottom: 12,
  },

  pillRow: {
    alignSelf: 'flex-start',
  },

  pill: {
    backgroundColor: '#0140CD',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },

  pillText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});
