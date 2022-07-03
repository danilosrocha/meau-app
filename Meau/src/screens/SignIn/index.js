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

  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleSignClick = () => {

  }

  const handleRegisterClick = () => {
    navigation.reset({
      routes: [{ name: 'SignUp' }]
    });
  }
  return (
    <Container>
      <WelcomeSign>Bem vindo ao Meau!</WelcomeSign>

      <InputArea>
        <SignInput
          placeholder="Digite seu e-mail"
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
          <CustomButtonText>Login</CustomButtonText>
        </CustomButton>

      </InputArea>

      <SignMessageButton onPress={handleRegisterClick}>
        <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
}