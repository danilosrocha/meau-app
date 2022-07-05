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

import { auth } from '../../../firebase'

export default () => {


  const navigation = useNavigation();

  const [name, setNameField] = useState('');
  const [email, setEmailField] = useState('');
  const [password, setPasswordField] = useState('');

  const handleSignUpClick = () => {
    auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log("Resgistrado com email: ", user.email);
    })
    .catch(error => alert(error.message))

}

  const handleRegisterClick = () => {
    navigation.reset({
      routes: [{ name: 'SignIn' }]
    });
  }
  return (
    <Container>
      <WelcomeSign>Bem vindo ao Meau!</WelcomeSign>

      <InputArea>
        <SignInput
          placeholder="Digite seu nome"
          value={name}
          onChangeText={t => setNameField(t)}
        />

        <SignInput
          placeholder="Digite seu email"
          value={email}
          onChangeText={t => setEmailField(t)}
        />

        <SignInput
          placeholder="Digite sua senha"
          value={password}
          onChangeText={t => setPasswordField(t)}
          password={true}
        />



        <CustomButton onPress={handleSignUpClick}>
          <CustomButtonText>Cadastrar</CustomButtonText>
        </CustomButton>

      </InputArea>

      <SignMessageButton onPress={handleRegisterClick}>
        <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
}