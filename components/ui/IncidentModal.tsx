import React, { useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Checklist from './Checklist';

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm?: (answers: Record<string, boolean | null>, description: string) => void;
};

const defaultItems = [
  'retraso', 'problema_mecanico', 'accidente', 'perdida_carga', 'condiciones_climaticas_adversas'
];

export default function IncidentModal({ visible, onClose, onConfirm }: Props) {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [desc, setDesc] = useState('');

  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 bg-black bg-opacity-45 justify-center items-center p-6">
        <View className="bg-white rounded-2xl p-6 w-full max-h-[80%]"> 
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-[#0140CD] text-xl font-bold">Registro de incidentes</Text>
            <TouchableOpacity onPress={onClose}><Text className="text-[#0140CD]">Cerrar</Text></TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={{ paddingBottom: 16 }}> 
            <TextInput
              className="bg-white border-[#0140CD] border-2 rounded-xl p-3 text-black text-base min-h-[80px] mb-4"
              placeholder="Descripción del incidente"
              placeholderTextColor="#666"
              multiline
              value={desc}
              onChangeText={setDesc}
            />
            <Checklist items={defaultItems} onChange={(a)=>setAnswers(a)} compact />
          </ScrollView>
          <View className="flex-row justify-end mt-3"> 
            <TouchableOpacity onPress={onClose} className="py-3 px-4 rounded-xl bg-gray-400 mr-2">
              <Text className="text-white">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { onConfirm?.(answers, desc); onClose(); }} className="py-3 px-4 rounded-xl bg-[#0140CD]">
              <Text className="text-white">Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
