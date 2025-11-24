import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import PrimaryButton from '../ui/PrimaryButton';
import TextField from '../ui/TextField';

type Props = {
  mode: 'login' | 'register';
  onSubmit: (values: { email: string; password: string }) => void;
};

export default function AuthForm({ mode, onSubmit }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <TextField placeholder="Correo electrónico" value={email} onChangeText={setEmail} icon="email" />
      <TextField placeholder="Contraseña" value={password} onChangeText={setPassword} secure icon="lock" />
      <View style={styles.buttonWrap}>
        <PrimaryButton title={mode === 'login' ? 'Entrar' : 'Crear cuenta'} onPress={() => onSubmit({ email, password })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  buttonWrap: { marginTop: 8 },
});
