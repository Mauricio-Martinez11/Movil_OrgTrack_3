import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayoutWrapper() {
  // Provide an auth group layout that hides headers for all auth screens
  return <Stack screenOptions={{ headerShown: false }} />;
}
