import React, { useMemo, useRef, useState } from 'react';
import { Animated, Dimensions, PanResponder, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

const windowHeight = Dimensions.get('window').height;

export default function BottomSheet({
  minHeight = 125,
  maxHeight = Math.round(windowHeight * 0.85),
  summary,
  children,
  style,
}: {
  minHeight?: number;
  maxHeight?: number;
  summary?: React.ReactNode;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const animatedHeight = useRef(new Animated.Value(minHeight)).current;
  const startHeight = useRef(minHeight);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 5,
        onPanResponderGrant: () => {
          animatedHeight.stopAnimation((value: number) => {
            startHeight.current = value;
          });
        },
        onPanResponderMove: (_, gestureState) => {
          let newHeight = startHeight.current - gestureState.dy;
          if (newHeight < minHeight) newHeight = minHeight;
          if (newHeight > maxHeight) newHeight = maxHeight;
          animatedHeight.setValue(newHeight);
        },
        onPanResponderRelease: (_, gestureState) => {
          animatedHeight.stopAnimation((currentHeight: number) => {
            const velocity = gestureState.vy;
            const dragThreshold = (maxHeight - minHeight) * 0.33;
            const shouldClose = gestureState.dy > dragThreshold || velocity > 1.2;
            const shouldOpen = gestureState.dy < -dragThreshold || velocity < -1.2;

            let toValue;
            let open;
            if (shouldClose) {
              toValue = minHeight;
              open = false;
            } else if (shouldOpen) {
              toValue = maxHeight;
              open = true;
            } else {
              toValue = sheetOpen ? maxHeight : minHeight;
              open = sheetOpen;
            }

            Animated.spring(animatedHeight, {
              toValue,
              useNativeDriver: false,
              friction: 12,
              tension: 50,
            }).start(() => setSheetOpen(open));
          });
        },
      }),
    [animatedHeight, minHeight, maxHeight, sheetOpen]
  );

  const contentOpacity = animatedHeight.interpolate({
    inputRange: [minHeight, maxHeight],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.wrapper,
        { height: animatedHeight },
        style as any,
      ]}
    >
      <View style={[styles.sheetContainer]}>
        <View {...panResponder.panHandlers} style={{ width: '100%' }}>
          <View style={{ width: '100%', alignItems: 'center', paddingVertical: 8 }}>
            <View style={styles.handle} />
          </View>

          {/* resumen siempre visible */}
          <View style={{ width: '100%' }}>
            <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>{summary}</View>
          </View>
        </View>

        <Animated.View style={[styles.separator, { opacity: animatedHeight.interpolate({ inputRange: [minHeight, minHeight + 20], outputRange: [0, 1], extrapolate: 'clamp' }) }]} />

        <Animated.ScrollView style={{ width: '100%', opacity: contentOpacity }} contentContainerStyle={{ paddingBottom: 40 }}>
          <View style={{ paddingHorizontal: 16, marginTop: 12 }}>{children}</View>
        </Animated.ScrollView>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 0,
    zIndex: 10,
    alignItems: 'center',
    overflow: 'hidden',
  },
  sheetContainer: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 24,
    paddingHorizontal: 24,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    alignItems: 'center',
  },
  handle: {
    width: 48,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e5e7eb',
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    width: '100%'
  }
});
