import { useRouter } from 'expo-router';
import React from 'react';
import AuthLayout from '../../components/auth/AuthLayout';
import LoginForm from '../../components/auth/LoginForm';
import AuthCard from '../../components/ui/AuthCard';
import CardHeader from '../../components/ui/CardHeader';
import LinkText from '../../components/ui/LinkText';
import Logo from '../../components/ui/Logo';

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = (values: { email: string; password: string; remember: boolean }) => {
    // TODO: replace with real auth logic
    console.log('login', values);
    // navigate to cliente folder route (no /index)
    router.replace('/(main)/(cliente)');
  };

  return (
    <AuthLayout>
      <Logo />
      <AuthCard>
        <CardHeader>Inicia sesión para continuar</CardHeader>
        <LoginForm onSubmit={handleLogin} />

        <LinkText onPress={() => router.replace('/(auth)/register')}>Registrar nueva cuenta</LinkText>
      </AuthCard>
    </AuthLayout>
  );
}
 

