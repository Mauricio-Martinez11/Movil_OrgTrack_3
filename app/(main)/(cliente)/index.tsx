import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function ClienteHome() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 22, marginBottom: 12 }}>Cliente - Inicio</Text>
      <Link href="/(main)/(transportista)">
        <Text style={{ color: "blue" }}>Ir a Transportista</Text>
      </Link>
    </View>
  );
}
