import { useRouter } from 'expo-router';
import React from 'react';
import AuthLayout from '../../components/auth/AuthLayout';
import RegisterForm from '../../components/auth/RegisterForm';
import AuthCard from '../../components/ui/AuthCard';
import CardHeader from '../../components/ui/CardHeader';
import LinkText from '../../components/ui/LinkText';
import Logo from '../../components/ui/Logo';
import { register } from '../utils/auth';

export default function RegisterScreen() {
  const router = useRouter();

  const handleRegister = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    acceptTerms: boolean;
  }) => {
    try {
      const res = await register({ firstName: values.firstName, lastName: values.lastName, email: values.email, password: values.password });
      const role = res.role ?? 'cliente';
      if (role === 'transportista') router.replace('/(main)/(transportista)/envios');
      else router.replace('/(main)/(cliente)');
    } catch (e) {
      console.warn('Register error', e);
      // in future show UI error messages
    }
  };

  return (
    <AuthLayout>
      <Logo />
      <AuthCard>
        <CardHeader>Registrar nueva cuenta</CardHeader>
        <RegisterForm onSubmit={handleRegister} />

        <LinkText onPress={() => router.replace('/(auth)/login')}>Ya tengo una cuenta</LinkText>
      </AuthCard>
    </AuthLayout>
  );
}
