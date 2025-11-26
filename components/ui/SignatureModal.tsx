import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: (signatureBase64: string) => void;
};

const fakeSignature = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA';

export default function SignatureModal({ visible, onClose, onConfirm }: Props) {
  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 bg-black bg-opacity-45 justify-center items-center p-6">
        <View className="bg-white rounded-2xl p-6 w-full"> 
          <Text className="text-[#0140CD] text-xl font-bold mb-4">Firma del transportista</Text>
          <View className="border border-gray-200 h-48 rounded-xl mb-4 items-center justify-center">
            <Text className="text-gray-500">Área de firma (simulada)</Text>
          </View>
          <View className="flex-row justify-end"> 
            <TouchableOpacity onPress={onClose} className="py-3 px-4 rounded-xl bg-gray-400 mr-2">
              <Text className="text-white">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onConfirm(fakeSignature)} className="py-3 px-4 rounded-xl bg-[#0140CD]">
              <Text className="text-white">Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
