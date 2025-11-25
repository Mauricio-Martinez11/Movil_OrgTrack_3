import { useRouter } from 'expo-router';
import React from 'react';
import { setRole } from '../utils/auth';
import AuthLayout from '../../components/auth/AuthLayout';
import LoginForm from '../../components/auth/LoginForm';
import AuthCard from '../../components/ui/AuthCard';
import CardHeader from '../../components/ui/CardHeader';
import LinkText from '../../components/ui/LinkText';
import Logo from '../../components/ui/Logo';

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = async (values: { email: string; password: string; remember: boolean; role?: 'cliente' | 'transportista' }) => {
    // NOTE: Temporary login handler for prototyping. Replace this with real
    // authentication against your backend. After a successful login the server
    // should return a token (or user object with role) and the client should
    // securely persist that token. Right now we persist the role locally so
    // the app can demo role-specific navigation.
    console.log('login', values);
    // persist role (hardcoded selection from form)
    const role = values.role ?? 'cliente';
    await setRole(role);
    // navigate directly to the correct main route for that role
    if (role === 'transportista') {
      router.replace('/(main)/(transportista)/envios');
    } else {
      router.replace('/(main)/(cliente)');
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
 

