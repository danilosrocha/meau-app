import React, { useState, useEffect, useRef} from 'react'
import { ImageBackground } from 'react-native'
import { Container, LoadingIcon } from './styles'
import { useNavigation } from '@react-navigation/native'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Text, View, Button, Platform } from 'react-native';
import { auth, db, storage } from "../../../firebase";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default () => {
const idUser = auth.currentUser.uid;
const [data, setData]=useState("");
const getSolicitantes = () => {
    db.collection("PedidosAdocao")
      .get()
      .then((querySnapshot) => {
        let temporyData = [];
        querySnapshot.forEach((doc) => {
          if (auth.idUser == doc.data().Dono) {
            const Solicitante = {
              EmailSolicitante: doc.data().SolicitanteEmail,
              NomeAnimal: doc.data().petName,
            };
            temporyData.push(Solicitante);
          }
        });
        setData(temporyData);
      });
  };
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Existem pedidos de adoção para seu pet",
      body: 'Os donos dos seguintes emails solicitam adoção para algum de seus pets:',
      data,
    },
    trigger: { seconds: 1 },
  });
}

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const navigation = useNavigation();
  
    useEffect(() => {


    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
  getSolicitantes(); 
    token = 0;
    if (token !== 0) {
        if(data!==""){
            schedulePushNotification();
        }
    } else {
        if(data!==""){
            schedulePushNotification();
        }setTimeout(function () {
        navigation.navigate('SignIn');
      }, 1000);
    }

  }, [])

  return (
    <ImageBackground source={require('../../../assets/1.png')} style={{ flex: 1 }}>
      <Container>
        <LoadingIcon size="large" color="#ffffff" />
      </Container>
    </ImageBackground>
  );
}
