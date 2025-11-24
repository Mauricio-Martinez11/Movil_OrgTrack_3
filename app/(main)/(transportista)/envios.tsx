import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import FilterTabs from '../../../components/transport/FilterTabs';
import ShipmentsList from '../../../components/transport/ShipmentsList';
import TransportHeader from '../../../components/transport/TransportHeader';

export default function EnviosPage() {
  const [filtroActual, setFiltroActual] = useState<string>('asignado');

  return (
    // SafeArea con fondo blanco → cubre totalmente el notch y el header
    <SafeAreaView style={styles.safe}>
      
      {/* Header completamente blanco */}
      <TransportHeader title="Envíos" />

      {/* Controles debajo del header */}
      <FilterTabs value={filtroActual} onChange={setFiltroActual} />

      {/* Contenido gris */}
      <View style={styles.content}>
        <ShipmentsList filter={filtroActual} />
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  safe: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },

  // Fondo del contenido → gris (solo debajo del header)
  content: { 
    flex: 1, 
    backgroundColor: '#f4f6f8' 
  }
});
