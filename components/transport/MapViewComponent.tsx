import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import MapView, { Marker, Polyline, Region } from 'react-native-maps';

type Coord = { latitude: number; longitude: number };

export default function MapViewComponent({
  region,
  origin,
  destination,
  ruta,
  style,
}: {
  region: Region | null;
  origin?: Coord | null;
  destination?: Coord | null;
  ruta?: Coord[];
  style?: StyleProp<ViewStyle>;
}) {
  if (!region) return <View style={[{ flex: 1, backgroundColor: '#f3f4f6' }, style as any]} />;

  return (
    <MapView style={[{ flex: 1 }, style as any]} initialRegion={region} region={region}>
      {origin && <Marker coordinate={origin} />}
      {destination && <Marker coordinate={destination} pinColor="red" />}
      {ruta && ruta.length > 0 && <Polyline coordinates={ruta} strokeColor="#0140CD" strokeWidth={4} />}
    </MapView>
  );
}
