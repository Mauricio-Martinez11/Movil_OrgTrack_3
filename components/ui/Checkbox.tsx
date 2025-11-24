import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  label?: string;
  value: boolean;
  onToggle: () => void;
};

export default function Checkbox({ label, value, onToggle }: Props) {
  return (
    <Pressable style={styles.row} onPress={onToggle}>
      <View style={[styles.box, value && styles.boxChecked]}>{value ? <Text style={styles.check}>✓</Text> : null}</View>
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  box: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxChecked: { backgroundColor: '#fff', borderColor: '#64748b' },
  check: { color: '#111827', fontSize: 14 },
  label: { color: '#374151' },
});
