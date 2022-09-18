import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { auth } from '../../../firebase'
import { db } from '../../../firebase'
import { useNavigation } from "@react-navigation/native";
import { v4 as uuidv4 } from "uuid";
import {
  CustomButtonText,
  CustomButtonAdoption,
  InputArea
} from "./styles";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default ({ expoPushTokenOwner, ownerName, idRequestingUser, requestingUser, name, idPet, request }) => {

  const navigation = useNavigation();

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [message, setMessage] = useState();
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };

  }, []);

  const handleAdoptClick = () => {
    navigation.navigate("Meus Pets")

  };

  return (
    <InputArea>
      <CustomButtonAdoption onPress={async () => {
        await sendPushNotification(expoPushTokenOwner, ownerName, idRequestingUser, requestingUser, name, idPet, request), handleAdoptClick();
      }}>
        <CustomButtonText>Solicitar a adoção do Pet</CustomButtonText>
      </CustomButtonAdoption>
    </InputArea>
  );
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushTokenOwner, ownerName, idRequestingUser, requestingUser, name, idPet, request) {
  const idReq = uuidv4()
  auth;
  const message = {
    to: expoPushTokenOwner,
    sound: 'default',
    title: 'Solicitação de adoção!',
    body: `Olá ${ownerName}! O usuário ${requestingUser} gostaria de adotar: ${name}`,
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });


  const colectAdoptionRequests = db.collection("AdoptionRequests");
  const adoptionRequests = colectAdoptionRequests.doc(idPet);
  const requests = adoptionRequests.collection("Requests");
  const IdReq = requests.doc(idReq);

  const data = {
    idReq: idReq,
    idRequestingUser: idRequestingUser,
    request: request,
    title: 'Solicitação de adoção!',
    body: `Olá ${ownerName}! O usuário ${requestingUser} gostaria de adotar: ${name}`,
  }

  IdReq
    .set(data)
    .then(() => {
      console.log(">>>>>>> Requisicao: requisicao adcionada");
    })

    .catch((error) => alert(error.message));
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

