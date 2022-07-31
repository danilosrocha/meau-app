import React, { useState } from 'react'
import {
  Container,
  SimpleText,
  InputArea,
  CustomButton,
  CustomButtonText,
  ScrollViewSignUp,
  TitleText,

} from './styles'

import SignInput from '../../components/SignInput'
import { useNavigation } from '@react-navigation/native'
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
    const profilePicture = "https://sdama.org/wp-content/themes/sama/img/fallback-profile.jpg"

    const data = {
      "id": auth.currentUser?.uid,
      "email": auth.currentUser?.email,
      "nome": name,
      "telefone": fone,
      "cidade": city,
      "endereco": adress,
      "dataNascimento": birth,
      "fotoUsuario": profilePicture
    }
    myDoc.set(data)
      .then(() => {
        alert("conta criada!")
        navigation.reset({
          routes: [{ name: 'RoutesTab' }]
        });
      }).catch(error => alert(error.message))
  }

  return (
    <Container>

      <ScrollViewSignUp>

        <InputArea>

          <TitleText>Etapa 2 de 2</TitleText>
          <SignInput
            placeholder="Nome"
            value={name}
            onChangeText={t => setNameField(t)}
          />

          <SignInput
            placeholder="Telefone"
            value={fone}
            onChangeText={t => setFoneField(t)}
          />

          <SignInput
            placeholder="Cidade"
            value={city}
            onChangeText={t => setCityField(t)}
          />

          <SignInput
            placeholder="Endereço"
            value={adress}
            onChangeText={t => setAdressField(t)}
          />

          <SignInput
            placeholder="Data de nascimento"
            value={birth}
            onChangeText={t => setBirthField(t)}
          />

          <CustomButton onPress={handleUpdateClick}>
            <CustomButtonText>Cadastrar</CustomButtonText>
          </CustomButton>

          <SimpleText>Email: {auth.currentUser?.email}</SimpleText>

        </InputArea>

      </ScrollViewSignUp>

    </Container>
  );
}
