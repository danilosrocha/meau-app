import React, { useState } from 'react'
import {
  Container,
  SimpleText,
  WelcomeSign,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
  ViewArea,

} from './styles'

import SignInput from '../../components/SignInput'
import { useNavigation } from '@react-navigation/native'

import { auth } from '../../../firebase'

export default () => {


  const navigation = useNavigation();

  const [email, setEmailField] = useState('');
  const [password, setPasswordField] = useState('');

  const handleSignUpClick = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
    navigation.reset({
      routes: [{ name: 'SignUp_2' }]

    })

  }

  const handleBackClick = () => {
    navigation.reset({
      routes: [{ name: 'SignIn' }]
    });
  }
  return (
    <Container>

      <ViewArea>
        <InputArea>

          <WelcomeSign>Faça seu cadastro!</WelcomeSign>

          <SimpleText>Etapa 1 de 2</SimpleText>

          <SignInput
            placeholder="Email"
            value={email}
            onChangeText={t => setEmailField(t)}
          />

          <SignInput
            placeholder="Senha"
            value={password}
            onChangeText={t => setPasswordField(t)}
            password={true}
          />

          <CustomButton onPress={handleSignUpClick}>
            <CustomButtonText>Continuar</CustomButtonText>
          </CustomButton>

          <SignMessageButton onPress={handleBackClick}>
            <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
            <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
          </SignMessageButton>

        </InputArea>
      </ViewArea>

    </Container>
  );
}