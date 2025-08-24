import { Tabs } from 'expo-router';
import React, { createContext, useContext, useState } from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Create context for camera state
interface CameraContextType {
  isCameraVisible: boolean;
  setIsCameraVisible: (visible: boolean) => void;
}

const CameraContext = createContext<CameraContextType | undefined>(undefined);

export const useCamera = () => {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error('useCamera must be used within a CameraProvider');
  }
  return context;
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isCameraVisible, setIsCameraVisible] = useState(false);

  return (
    <CameraContext.Provider value={{ isCameraVisible, setIsCameraVisible }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          // Hide tab bar when camera is visible
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            ...Platform.select({
              ios: {
                position: 'absolute',
              },
              default: {},
            }),
            display: isCameraVisible ? 'none' : 'flex',
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="quizzes"
          options={{
            title: 'Quizzes',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="questionmark.circle.fill" color={color} />,
          }}
        />
      </Tabs>
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="gear" color={color} />,
          }}
        />
    </CameraContext.Provider>
  );
}
