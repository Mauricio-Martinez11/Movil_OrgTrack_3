import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = { children: React.ReactNode };

export default function AuthLayout({ children }: Props) {
  return <View style={styles.screen}>{children}</View>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});
