import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';
import BackButton from '../../../components/transport/BackButton';
import BottomSheet from '../../../components/transport/BottomSheet';
import MapViewComponent from '../../../components/transport/MapViewComponent';

export default function InformacionEnvio() {
  const { id_asignacion } = useLocalSearchParams<{ id_asignacion: string }>();
  const [envio, setEnvio] = useState<any>(null);
  const [region, setRegion] = useState<any | null>(null);
  const [ruta, setRuta] = useState<any[]>([]);

  // Hardcoded 
  const SAMPLE: any = {
    id_asignacion: id_asignacion || '123',
    id_envio: 334,
    estado: 'Pendiente',
    estado_envio: 'Pendiente',
    coordenadas_origen: [-17.7833, -63.1821],
    coordenadas_destino: [-17.7980, -63.1610],
    rutaGeoJSON: { coordinates: [[-63.1821, -17.7833], [-63.1610, -17.7980]] },
    nombre_origen: 'Origen demo',
    nombre_destino: 'Destino demo',
    tipo_transporte: 'Camión',
    cargas: [{ variedad: 'Maíz', peso: 1200, cantidad: 10 }],
  };

  useEffect(() => {
    
    setEnvio(SAMPLE);
    setRegion({ latitude: SAMPLE.coordenadas_origen[0], longitude: SAMPLE.coordenadas_origen[1], latitudeDelta: 0.05, longitudeDelta: 0.05 });
    setRuta(SAMPLE.rutaGeoJSON.coordinates.map((c: any) => ({ latitude: c[1], longitude: c[0] })));
  }, [id_asignacion]);

  if (!region || !envio) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#0140CD" />
        <Text style={{ marginTop: 8, color: '#4b5563' }}>Cargando mapa…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackButton />

      <MapViewComponent
        region={region}
        origin={{ latitude: envio.coordenadas_origen[0], longitude: envio.coordenadas_origen[1] }}
        destination={{ latitude: envio.coordenadas_destino[0], longitude: envio.coordenadas_destino[1] }}
        ruta={ruta}
      />

      <BottomSheet
        minHeight={125}
        maxHeight={Math.round(Dimensions.get('window').height * 0.85)}
        summary={(
          <>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Text style={{ color: '#0140CD', fontWeight: '700', fontSize: 18 }}>Envío #{envio.id_envio}</Text>
            </View>
            <Text style={{ color: '#6b7280' }}>{envio.estado || envio.estado_envio}</Text>
          </>
        )}
      >
        {/* Minimal content inside sheet - user can expand later */}
        <View>
          <Text style={{ color: '#000', fontSize: 16, fontWeight: '700', marginBottom: 8 }}>Asignación Nº {envio.id_asignacion}</Text>
          <Text style={{ color: '#000', fontSize: 14, marginBottom: 6 }}>Origen: {envio.nombre_origen}</Text>
          <Text style={{ color: '#000', fontSize: 14, marginBottom: 6 }}>Destino: {envio.nombre_destino}</Text>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
