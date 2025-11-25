import React from "react";
import { Text, View } from "react-native";

export default function ClienteHome() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 22, marginBottom: 12 }}>Cliente - Inicio</Text>
      {/* Link to transportista removed — client users should not see transportista screens in Drawer
          NOTE: this was removed as part of a temporary role-based navigation demo. When
          backend-auth and roles are available, restore or adjust navigation depending
          on server-side permissions. */}
    </View>
  );
}
