import { useRouter } from 'expo-router';
import React from 'react';
import AuthLayout from '../../components/auth/AuthLayout';
import RegisterForm from '../../components/auth/RegisterForm';
import AuthCard from '../../components/ui/AuthCard';
import CardHeader from '../../components/ui/CardHeader';
import LinkText from '../../components/ui/LinkText';
import Logo from '../../components/ui/Logo';

export default function RegisterScreen() {
  const router = useRouter();

  const handleRegister = (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    acceptTerms: boolean;
  }) => {
    // TODO: replace with real registration logic (validation, API call, etc.)
    console.log('register', values);
    router.replace('/(main)/(cliente)');
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
