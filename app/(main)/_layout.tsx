import 'react-native-gesture-handler';

import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getRole } from '../utils/auth';

export default function MainLayout() {
  // NOTE: This layout currently reads a role from AsyncStorage using `getRole()` and
  // shows a simplified Drawer based on that role. This is intentionally hardcoded/demo
  // behavior to preview the UX. In production this should be replaced by a proper
  // authentication flow (login API, token, server-side role claims or an auth context)
  // and the menu should be derived from server permissions or centralized app state.
  const [userRole, setUserRole] = useState<'transportista' | 'cliente' | null>(null);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const role = await getRole();
      if (!mounted) return;
      setUserRole(role ?? 'cliente');
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (userRole === null) return null; // wait until we know the role

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Calculate drawer width dynamically so it opens farther to the right
          (currently uses 80% of screen width, max 420). Adjust multiplier/tope as needed */}
      <Drawer
        screenOptions={{
          headerShown: false, // Ocultamos el header nativo porque usamos un header personalizado
          drawerStyle: {
            width: Math.min(Math.round(Dimensions.get('window').width * 0.8), 420),
          },
        }}
        // custom drawer content: render only the items we want for the current role
        // NOTE: Hardcoded for demo — replace with server-driven menu or centralized
        // navigation config once real auth/permissions are available.
        drawerContent={(props) => (
          <DrawerContentScrollView {...props}>
            {userRole === 'transportista' ? (
              <DrawerItem
                label="Envíos"
                onPress={() => {
                  props.navigation.closeDrawer();
                  router.push('/(main)/(transportista)/envios');
                }}
              />
            ) : (
              <DrawerItem
                label="Inicio"
                onPress={() => {
                  props.navigation.closeDrawer();
                  router.push('/(main)/(cliente)');
                }}
              />
            )}
          </DrawerContentScrollView>
        )}
      >
        {/* define the screens so navigation targets exist, but drawerContent controls what's shown */}
        <Drawer.Screen name="(transportista)" />
        <Drawer.Screen name="(cliente)" />
      </Drawer>
    </GestureHandlerRootView>
  );
}
