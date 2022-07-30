import React, { useEffect, useState } from 'react'
import { ScrollView, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native'
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../../../firebase'
import {
  Container,
  WelcomeSign,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  ContentImg,
  Avatar,
  ScrollViewProfile,
} from './styles'
import SignInput from '../../components/SignInput'

export default () => {

  const navigation = useNavigation();

  const [name, setNameField] = useState('');
  const [fone, setFoneField] = useState('');
  const [city, setCityField] = useState('');
  const [adress, setAdressField] = useState('');
  const [birth, setBirthField] = useState('');

  const [avatar, setAvatar] = useState();

  /*USER DATA*/
  const handleImageUser = () => {
    Alert.alert(
      "Selecione",
      "Informe de onde você quer pegar a foto",
      [
        {
          text: "Galeria",
          onPress: () => pickImageFromGalery(),
          style: "default"
        },
        {
          text: "Camera",
          onPress: () => pickImageFromCamera(),
          style: "default"
        }
      ],
      {
        cancelable: true,
        onDismiss: () => console.log('tratar depois...')
      }
    )
  }

  const pickImageFromGalery = async () => {
    console.log("-----> Clicou na Galeria")
    const options = {
      noData: true,
      selectionLimit: 1, // Se deixar 1, será permitido apenas uma foto e 0 várias
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    }

    let result = await ImagePicker.launchImageLibraryAsync(options)
    setAvatar(result.uri)
    console.log(result.uri)

  }

  const pickImageFromCamera = async () => {
    console.log("-----> Clicou na Camera")

    const options = {
      noData: true,
    }

    let result = await ImagePicker.launchCameraAsync(options)
    setAvatar(result.uri)
    console.log(result.uri)
  }
  /*USER DATA*/

  /*USER DATA*/
  const idUser = auth.currentUser?.uid;
  const [data, setData] = useState([]);

  const getUsers = () => {
    db
      .collection("UserData")
      .get()
      .then((querySnapshot) => {
        let temporyData = []
        querySnapshot.forEach((doc) => {
          if (doc.id == idUser) {
            if (doc.data().nome == "") {
              // navigation.navigate("UpdateUserData")
              Alert.alert("Faltam dados para conta!") //Padronizar alerts
            } else {
              const user = {
                cidade: doc.data().cidade,
                dataNascimento: doc.data().dataNascimento,
                email: doc.data().email,
                endereco: doc.data().endereco,
                nome: doc.data().nome,
                telefone: doc.data().telefone,
              }
              setData(user)
            }
          }
        });
      });
  };

  useEffect(() => {
    console.log("Entrei aqui")
    getUsers();
  }, []);

  /*USER DATA*/
  const handleUpdateClick = () => {
    auth
    const colect = db.collection("UserData")
    const myDoc = colect.doc(auth.currentUser?.uid)

    const data = {
      "id": auth.currentUser?.uid,
      "email": auth.currentUser?.email,
      "nome": name,
      "telefone": fone,
      "cidade": city,
      "endereco": adress,
      "dataNascimento": birth
    }

    myDoc.set(data)
      .then(() => {
        Alert.alert("Informação", "Dados atualizado")
        navigation.navigate("Home")
      }).catch(error => alert(error.message))
  }

  const handleCancelClick = () => {
    navigation.navigate('Home');
  }

  return (
    <Container>
      <ScrollViewProfile>

        <ContentImg onPress={() => handleImageUser()}>
          <Avatar
            source={{ uri: "https://sdama.org/wp-content/themes/sama/img/fallback-profile.jpg" }}
          />
        </ContentImg>

        <InputArea>

          <SignMessageButtonText>Nome</SignMessageButtonText>
          <SignInput
            placeholder={data.nome}
            value={name}
            onChangeText={t => setNameField(t)}
          />

          <SignMessageButtonText>Tefelone</SignMessageButtonText>
          <SignInput
            placeholder={data.telefone}
            value={fone}
            onChangeText={t => setFoneField(t)}
          />

          <SignMessageButtonText>Cidade</SignMessageButtonText>
          <SignInput
            placeholder={data.cidade}
            value={city}
            onChangeText={t => setCityField(t)}
          />

          <SignMessageButtonText>Endereço</SignMessageButtonText>
          <SignInput
            placeholder={data.endereco}
            value={adress}
            onChangeText={t => setAdressField(t)}
          />

          <SignMessageButtonText>Data de nascimento</SignMessageButtonText>
          <SignInput
            placeholder={data.dataNascimento}
            value={birth}
            onChangeText={t => setBirthField(t)}
          />

          <CustomButton onPress={handleUpdateClick}>
            <CustomButtonText>Salvar</CustomButtonText>
          </CustomButton>

        </InputArea>

      </ScrollViewProfile>
    </Container>
  );
}