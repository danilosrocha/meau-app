import React, { useState } from 'react'
import { Text, View } from 'react-native'
import {
  Container,
  SimpleText,
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
        navigation.reset({
          routes: [{ name: 'SignUp_2' }]
        });
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

      <WelcomeSign>Faça seu cadastro!</WelcomeSign>
      
      <SimpleText>Etapa 1</SimpleText>
    
      <InputArea>

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

      </InputArea>

      <SignMessageButton onPress={handleRegisterClick}>
        <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
}