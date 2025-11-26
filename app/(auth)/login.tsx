import { useRouter } from 'expo-router';
import React from 'react';
import AuthLayout from '../../components/auth/AuthLayout';
import LoginForm from '../../components/auth/LoginForm';
import AuthCard from '../../components/ui/AuthCard';
import CardHeader from '../../components/ui/CardHeader';
import LinkText from '../../components/ui/LinkText';
import Logo from '../../components/ui/Logo';
import { login } from '../utils/auth';

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = async (values: { email: string; password: string; remember: boolean }) => {
    try {
      const res = await login(values.email, values.password);
      const role = res.role ?? 'cliente';
      // navigate based on role returned by server
      if (role === 'transportista') router.replace('/(main)/(transportista)/envios');
      else router.replace('/(main)/(cliente)');
    } catch (e) {
      console.warn('Login error', e);
      // keep existing behavior: remain on page; in future show UI error
    }
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
 

