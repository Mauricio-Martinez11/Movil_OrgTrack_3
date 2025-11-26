import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FilterTabs from '../../../components/transport/FilterTabs';
import ShipmentsList from '../../../components/transport/ShipmentsList';
import TransportHeader from '../../../components/transport/TransportHeader';
import { clearAuth } from '../../utils/auth';

export default function EnviosPage() {
  const [filtroActual, setFiltroActual] = useState<string>('asignado');
  const router = useRouter();

  const handleLogout = async () => {
    await clearAuth();
    router.replace('/(auth)/login');
  };

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
        
        {/* Botón temporal de logout */}
        <TouchableOpacity
          onPress={handleLogout}
          style={styles.logoutButton}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Cerrar Sesión</Text>
        </TouchableOpacity>
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
  },

  logoutButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#ef4444',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
});
