import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/stacks/MainStack';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";


export default () => {

  return (
    <NavigationContainer>
        <MainStack>
        </MainStack>
    </NavigationContainer>
  );
}
