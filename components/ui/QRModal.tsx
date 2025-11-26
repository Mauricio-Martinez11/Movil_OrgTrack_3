import React from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  qrImage?: string | null;
};

export default function QRModal({ visible, onClose, qrImage }: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 bg-black bg-opacity-45 justify-center items-center p-6">
        <View className="bg-white rounded-2xl p-6 w-full items-center"> 
          <Text className="text-[#0140CD] text-lg font-bold mb-2">Escanea este QR</Text>
          {qrImage ? (
            <Image source={{ uri: qrImage }} className="w-[220px] h-[220px] my-4" />
          ) : (
            <View className="w-[220px] h-[220px] my-4 bg-gray-100 items-center justify-center rounded-xl border border-gray-200">
              <Text className="text-gray-400">QR (simulado)</Text>
            </View>
          )}
          <TouchableOpacity onPress={onClose} className="bg-[#0140CD] py-3 px-6 rounded-xl mt-2">
            <Text className="text-white">Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
