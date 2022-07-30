import React, { useEffect, useState } from 'react'
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

  const [email, setEmailField] = useState('');
  const [password, setPasswordField] = useState('');

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          navigation.navigate("Home")
        }
      })

      return unsubscribe;
  }, [])

  const handleSignClick = () => {
    auth
    .signInWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Logado com o email: ', user.email);
    })
    .catch(error => alert(error.message))
  }

  const handleRegisterClick = () => {
    navigation.navigate("SignUp_1")
  };
  
/*
  const handleRegisterClick = () => {
    navigation.reset({
      routes: [{ name: 'SignUp_1' }]
    });
  }
*/ 

  return (
    <Container>
      <WelcomeSign>Bem vindo ao Meau!</WelcomeSign>

      <InputArea>
        <SignInput
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={t => setEmailField(t)}
          
        />

        <SignInput
          placeholder="Digite sua senha"
          value={password}
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