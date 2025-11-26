import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

type Props = {
  items: string[];
  onChange?: (answers: Record<string, boolean | null>) => void;
  compact?: boolean;
};

const Checklist: React.FC<Props> = ({ items, onChange, compact }) => {
  const init = Object.fromEntries(items.map((k) => [k, null]));
  const [answers, setAnswers] = useState<Record<string, boolean | null>>(init);

  useEffect(() => {
    onChange?.(answers);
  }, [answers, onChange]);

  const setAnswer = (key: string, val: boolean) =>
    setAnswers((p) => ({ ...p, [key]: val }));

  return (
    <ScrollView className={compact ? 'max-h-[220px]' : ''}>
      {items.map((k) => (
        <View
          key={k}
          className="flex-row items-center mb-3 py-3 px-3.5 bg-white rounded-xl border border-gray-200 shadow-sm"
        >
          <Text className="flex-1 text-black text-base capitalize">{k.replace(/_/g, ' ')}</Text>
          <View className="flex-row"> 
            <Pressable
              className={`py-1.5 px-4 rounded-full border border-[#0140CD] mr-2 ${answers[k] === true ? 'bg-[#0140CD]' : ''}`}
              onPress={() => setAnswer(k, true)}>
              <Text className={`${answers[k] === true ? 'text-white' : 'text-[#0140CD]'} font-semibold`}>Sí</Text>
            </Pressable>
            <Pressable
              className={`py-1.5 px-4 rounded-full border border-[#0140CD] ${answers[k] === false ? 'bg-[#0140CD]' : ''}`}
              onPress={() => setAnswer(k, false)}>
              <Text className={`${answers[k] === false ? 'text-white' : 'text-[#0140CD]'} font-semibold`}>No</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Checklist;
