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

import { useNavigation } from '@react-navigation/native'

import { auth } from '../../../firebase'

export default () => {

    const navigation = useNavigation();

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("SignIn")
            })
            .catch(error => alert(error.message))
    }

    const handleUpdate = () => {
        auth
            
                navigation.replace("UpdateUserData")
          
    }

    return (
        <Container>
            <WelcomeSign>
                <Text>Email: {auth.currentUser?.email}</Text>
            </WelcomeSign>

            <InputArea>
                <CustomButton onPress={handleSignOut}>
                    <CustomButtonText>Sign Out</CustomButtonText>
                </CustomButton>
            </InputArea>

            <InputArea>
                <CustomButton onPress={handleUpdate}>
                    <CustomButtonText>Atualizar seu cadastro</CustomButtonText>
                </CustomButton>
            </InputArea>

        </Container>
    );
}