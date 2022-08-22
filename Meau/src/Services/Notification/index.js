import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Platform } from 'react-native';
import { auth } from '../../../firebase'
import { db } from '../../../firebase'
import { useNavigation } from "@react-navigation/native";
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

export default ({ expoPushTokenOwner, ownerName, requestingUser, name, idPet }) => {

  const navigation = useNavigation();

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const handleTokenInsertAccount = () => {
    auth
    const colect = db.collection("UserData")
    const myDoc = colect.doc(auth.currentUser?.uid)

    const data = {
      "expoPushToken": expoPushToken,
    }
    myDoc.update(data)
      .then(() => { console.log(">>>>>> Token adicionado"); })
      .catch(error => alert(error.message))
  }

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
    handleTokenInsertAccount();
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };

  }, []);

  const handleAdoptClick = (idPet) => {

    // auth;
    // const colectHistory = db.collection("History");
    // const colectPet = db.collection("Pet");
    // const adoptionHistory = colectHistory.doc(auth.currentUser?.uid);
    // const myPet = colectPet.doc(idPet);
    console.log("----> Eu sou o id do Pet", idPet)
    navigation.navigate("Meus Pets")
    // const petPicture = "https://static.thenounproject.com/png/703110-200.png"
    // const historyData = {
    //   donoAtual: auth.currentUser?.uid,
    //   donoAntigo: currentOwner,
    //   id: idPet,
    //   statusAdocao: false,
    // }

    // const data = {
    //   donoId: auth.currentUser?.uid,
    //   id: idPet,
    //   statusAdocao: false,
    // };

    // myPet
    //   .update(data)
    //   .then(() => {
    //     adoptionHistory.set(historyData).then(() => {
    //       navigation.navigate()
    //     })
    //   })
    //   .catch((error) => alert(error.message));
  };

  return (
    <InputArea>
      <CustomButtonAdoption onPress={async () => {
        await sendPushNotification(expoPushTokenOwner, ownerName, requestingUser, name, idPet), handleAdoptClick(idPet);
      }}>
        <CustomButtonText>Solicitar a adoção do Pet</CustomButtonText>
      </CustomButtonAdoption>
    </InputArea>
  );
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushTokenOwner, ownerName, requestingUser, name) {
  const message = {
    to: expoPushTokenOwner,
    sound: 'default',
    title: 'Solicitação de adoção!',
    body: `Olá ${ownerName}! O usuário ${requestingUser} gostaria de adotar o ${name}`,
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
