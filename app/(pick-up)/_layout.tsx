import * as React from 'react';
import { Stack } from 'expo-router';

export default function _Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    />
  );
}
