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

export default () => {

  const navigation = useNavigation();

  const [nameField, setNameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleSignClick = () => {

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
          value={nameField}
          onChangeText={t => setNameField(t)}
        />

        <SignInput
          placeholder="Digite seu email"
          value={emailField}
          onChangeText={t => setEmailField(t)}
        />

        <SignInput
          placeholder="Digite sua senha"
          value={passwordField}
          onChangeText={t => setPasswordField(t)}
          password={true}
        />



        <CustomButton onPress={handleSignClick}>
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