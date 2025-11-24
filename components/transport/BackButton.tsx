import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function BackButton({ to = '/envios' }: { to?: string }) {
  const router = useRouter();
  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        onPress={() => router.replace(to as any)}
        style={styles.button}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={20} color="#0140CD" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 48,
    left: 16,
    zIndex: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 999,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
