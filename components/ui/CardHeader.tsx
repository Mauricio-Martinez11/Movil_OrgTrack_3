import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function CardHeader({ children }: { children: React.ReactNode }) {
  return <Text style={styles.header}>{children}</Text>;
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    marginBottom: 12,
    color: '#4b5563',
    fontSize: 16,
  },
});
