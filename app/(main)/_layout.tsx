import 'react-native-gesture-handler';

import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function MainLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: true, // Volvemos a mostrar el header del drawer como estaba antes
          drawerStyle: {
            width: 240,
          },
        }}
      >
        <Drawer.Screen
          name="(cliente)"
          options={{
            drawerLabel: 'Panel Cliente',
            title: 'Cliente',
          }}
        />
        <Drawer.Screen
          name="(transportista)"
          options={{
            drawerLabel: 'Panel Transportista',
            title: 'Transportista',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
