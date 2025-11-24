import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

type Props = {
  placeholder?: string;
  value?: string;
  onChangeText?: (t: string) => void;
  secure?: boolean;
  icon?: string;
};

export default function TextField({ placeholder, value, onChangeText, secure, icon }: Props) {
  return (
    <View style={styles.wrapper}>
      {icon ? <MaterialIcons name={icon as any} size={18} color="#9ca3af" style={styles.icon} /> : null}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
        style={[styles.input, icon ? { paddingLeft: 36 } : undefined]}
        placeholderTextColor="#9ca3af"
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    left: 8,
    top: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 10,
    paddingLeft: 12,
    borderRadius: 6,
    fontSize: 16,
    color: '#111827',
  },
});
