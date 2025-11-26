import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { clearAuth, getRole, getToken } from './utils/auth';

export default function Index() {
  const router = useRouter();
  const [showClearButton, setShowClearButton] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const token = await getToken();
        const role = await getRole();

        if (!mounted) return;

        // Show clear button for 3 seconds to allow clearing storage if needed
        setShowClearButton(true);
        setTimeout(() => {
          if (mounted) setShowClearButton(false);
        }, 3000);

        // If we have a token, redirect to the appropriate role view
        if (token && role) {
          if (role === 'transportista') {
            router.replace('/(main)/(transportista)/envios');
          } else {
            router.replace('/(main)/(cliente)');
          }
        } else {
          // No token or role, go to login
          router.replace('/(auth)/login');
        }
      } catch (e) {
        console.warn('Index redirect error', e);
        if (mounted) router.replace('/(auth)/login');
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const handleClearStorage = async () => {
    await clearAuth();
    console.log('Storage cleared, redirecting to login...');
    router.replace('/(auth)/login');
  };

  // Show loading indicator while checking auth state
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <ActivityIndicator size="large" color="#0284c7" />
      {showClearButton && (
        <TouchableOpacity
          onPress={handleClearStorage}
          style={{
            position: 'absolute',
            top: 50,
            backgroundColor: '#ef4444',
            padding: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Limpiar Sesión</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
