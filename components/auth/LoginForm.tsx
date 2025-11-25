import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Checkbox from '../../components/ui/Checkbox';
import PrimaryButton from '../../components/ui/PrimaryButton';
import TextField from '../../components/ui/TextField';

type Values = { email: string; password: string; remember: boolean; role: 'cliente' | 'transportista' };

export default function LoginForm({ onSubmit }: { onSubmit?: (v: Values) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [role, setRole] = useState<'cliente' | 'transportista'>('cliente');

  return (
    <View>
      <TextField placeholder="Correo" value={email} onChangeText={setEmail} icon="email" />
      <TextField placeholder="Contraseña" value={password} onChangeText={setPassword} secure icon="lock" />

      <View style={{ marginTop: 8 }}>
        {/* Role selector is temporary/hardcoded for demo purposes.
            Replace with a proper login flow that determines role from the server
            (response/token) instead of letting users pick it freely in the form. */}
        <View style={styles.roleRow}>
          <PrimaryButton
            title="Soy Cliente"
            onPress={() => setRole('cliente')}
            // visual hint: reuse PrimaryButton styling, but rely on text color for selection
          />
          <View style={{ width: 8 }} />
          <PrimaryButton title="Soy Transportista" onPress={() => setRole('transportista')} />
        </View>

        <View style={styles.rowBetween}>
          <Checkbox label="Recordarme" value={remember} onToggle={() => setRemember(!remember)} />
          <PrimaryButton title="Entrar" onPress={() => onSubmit?.({ email, password, remember, role })} />
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
    marginTop: 6,
  },
  roleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
});
