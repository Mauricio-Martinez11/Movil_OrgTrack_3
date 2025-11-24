import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export default function LinkText({ children, onPress }: { children: React.ReactNode; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.link}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  link: { color: '#0ea5e9', textAlign: 'center', marginTop: 10 },
});
