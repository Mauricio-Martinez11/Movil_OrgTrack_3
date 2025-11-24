import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Logo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Org<Text style={styles.titleAccent}>Track</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    color: '#6b7280',
    fontWeight: '600',
  },
  titleAccent: {
    color: '#111827',
    fontWeight: '700',
  },
});
