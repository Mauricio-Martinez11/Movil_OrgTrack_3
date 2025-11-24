import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Checkbox from '../ui/Checkbox';
import PrimaryButton from '../ui/PrimaryButton';
import TextField from '../ui/TextField';

type Values = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  acceptTerms: boolean;
};

export default function RegisterForm({ onSubmit }: { onSubmit?: (v: Values) => void }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  return (
    <View>
      <TextField placeholder="Nombre" value={firstName} onChangeText={setFirstName} icon="person" />
      <TextField placeholder="Apellido" value={lastName} onChangeText={setLastName} icon="person" />
      <TextField placeholder="Correo" value={email} onChangeText={setEmail} icon="email" />
      <TextField placeholder="Contraseña" value={password} onChangeText={setPassword} secure icon="lock" />

      <View style={styles.rowBetween}>
        <View style={{ flex: 1 }}>
          <Checkbox label="Acepto los términos" value={acceptTerms} onToggle={() => setAcceptTerms(!acceptTerms)} />
        </View>
        <View style={{ marginLeft: 12, width: 120 }}>
          <PrimaryButton title="Registrar" onPress={() => onSubmit?.({ firstName, lastName, email, password, acceptTerms })} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});
