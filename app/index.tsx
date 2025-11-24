import { Redirect } from 'expo-router';
import React from 'react';

export default function Index() {
  // Redirect to login as the first screen
  return <Redirect href='/(auth)/login' />;
}
