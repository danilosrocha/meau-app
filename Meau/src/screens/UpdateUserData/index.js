import React, { useState } from 'react'
import { Text, View } from 'react-native'
import {
  Container,
  WelcomeSign,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold

} from './styles'

import SignInput from '../../components/SignInput'
import { useNavigation } from '@react-navigation/native'
import { doc, setDoc } from "firebase/firestore";
import { auth } from '../../../firebase'
import { db } from '../../../firebase'

export default () => {


  const navigation = useNavigation();

  const [name, setNameField] = useState('');
  const [fone, setFoneField] = useState('');
  const [city, setCityField] = useState('');
  const [adress, setAdressField] = useState('');
  const [birth, setBirthField] = useState('');

  const handleUpdateClick = () => {
    auth
    const colect = db.collection("UserData")
    const myDoc = colect.doc(auth.currentUser?.uid)

    const data = {
      "nome": name,
      "telefone": fone,
      "cidade": city,
      "endereco": adress,
      "dataNascimento": birth
    }
    myDoc.set(data)
      .then(() => {
        alert("documento atualizado")
        navigation.reset({
          routes: [{ name: 'Home' }]
        });
      }).catch(error => alert(error.message))


  }

  const handleRegisterClick = () => {
    auth
    navigation.reset({
      routes: [{ name: 'Home' }]
    });
  }
  return (
    <Container>
      <WelcomeSign>Bem vindo ao Meau!</WelcomeSign>

      <InputArea>

        <SignInput
          placeholder="Digite seu telefono"
          value={fone}
          onChangeText={t => setFoneField(t)}
        />

        <SignInput
          placeholder="Digite sua cidade"
          value={city}
          onChangeText={t => setCityField(t)}
        />

        <SignInput
          placeholder="Digite seu endereço"
          value={adress}
          onChangeText={t => setAdressField(t)}
        />

        <SignInput
          placeholder="Digite a data de seu nascimento"
          value={birth}
          onChangeText={t => setBirthField(t)}
        />

        <CustomButton onPress={handleUpdateClick}>
          <CustomButtonText>Atualizar dados</CustomButtonText>
        </CustomButton>

      </InputArea>
      <Text>Email: {auth.currentUser?.email}</Text>
      <SignMessageButton onPress={handleRegisterClick}>
        <SignMessageButtonText>Cancelar</SignMessageButtonText>
      </SignMessageButton>
    </Container>
  );
}