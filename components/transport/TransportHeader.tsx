import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TransportHeader({ title = 'Envíos' }: { title?: string }) {
  const navigation = useNavigation();

  return (
    <View style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={styles.menu}
        >
          <Ionicons name="menu" size={26} color="#0140CD" />
        </TouchableOpacity>

        <View style={styles.titleWrap}>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.rightPlaceholder} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { backgroundColor: '#fff' },
  container: { flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingHorizontal: 12, paddingBottom: 12, backgroundColor: '#fff' },
  menu: { width: 36 },
  titleWrap: { flex: 1, alignItems: 'center' },
  title: { color: '#0140CD', fontSize: 18, fontWeight: '700' },
  rightPlaceholder: { width: 36 },
});
