import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/stacks/MainStack';import * as Device from 'expo-device';

export default () => {
  return (
    <NavigationContainer>
        <MainStack>
        </MainStack>
    </NavigationContainer>
  );
}