import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  value: string;
  onChange: (v: string) => void;
};

const OPTIONS = [
  { key: 'en curso', label: 'En Curso' },
  { key: 'completados', label: 'Completados' },
  { key: 'asignado', label: 'Asignados' },
];

export default function FilterTabs({ value, onChange }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        {OPTIONS.map((o) => (
          <TouchableOpacity
            key={o.key}
            onPress={() => onChange(o.key)}
            style={[styles.btn, value === o.key ? styles.btnActive : null]}
          >
            <Text style={[styles.btnText, value === o.key ? styles.btnTextActive : null]}>{o.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: '#fff' },
  row: { flexDirection: 'row', justifyContent: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eef2f6' },
  btn: { paddingHorizontal: 12, paddingVertical: 6, marginHorizontal: 6, borderRadius: 999 },
  btnActive: { borderWidth: 1, borderColor: '#0140CD' },
  btnText: { color: '#6b7280' },
  btnTextActive: { color: '#0140CD' },
});
