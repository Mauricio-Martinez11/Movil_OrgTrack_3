import React, { useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ShipmentCard from './ShipmentCard';

type Shipment = {
  id: number;
  name?: string;
  status?: string;
  subtitle?: string;
};

type Props = {
  filter?: string;
  items?: Shipment[]; // optional override for tests
};

const SAMPLE_RAW = [
  { id_asignacion: 288, id_envio: 298, estado: 'Entregado', fecha: '2025-06-03' },
  { id_asignacion: 297, id_envio: 306, estado: 'Entregado', fecha: '2025-06-10' },
  { id_asignacion: 298, id_envio: 307, estado: 'Entregado', fecha: '2025-06-02' },
  { id_asignacion: 302, id_envio: 311, estado: 'Entregado', fecha: '2025-06-12' },
  { id_asignacion: 303, id_envio: 312, estado: 'Entregado', fecha: '2025-06-06' },
];

export default function ShipmentsList({ filter = 'asignado', items }: Props) {
  const mapped: Shipment[] = useMemo(() => {
    if (items && items.length) return items;
    return SAMPLE_RAW.map((r) => ({
      id: r.id_asignacion,
      name: `Asignación N.º ${r.id_asignacion}`,
      status: r.estado,
      subtitle: `Envío #${r.id_envio} ▪︎ ${r.fecha}`,
    }));
  }, [items]);

  const filtered = useMemo(() => {
    const lower = (s = '') => s.toLowerCase();
    return mapped.filter((m) => {
      const estado = lower(m.status || '');
      switch (filter) {
        case 'en curso':
          return estado.includes('ruta') || estado.includes('en curso') || estado.includes('en camino');
        case 'completados':
          return estado.includes('entregado');
        case 'asignado':
          return estado.includes('asignado') || estado.includes('pendiente') || estado === '';
        default:
          return true;
      }
    });
  }, [mapped, filter]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {filtered.map((s) => (
        <ShipmentCard key={s.id} id={s.id} title={s.name} subtitle={s.subtitle} status={s.status} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 36,
    paddingHorizontal: 12,
    alignItems: 'stretch',
  },
});
