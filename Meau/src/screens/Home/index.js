import React, { useState } from 'react'
import { Text, View } from 'react-native'
import {
    Container,
    WelcomeSign,
    InputArea,
    CustomButton,
    CustomButtonText
} from './styles'

import { useNavigation } from '@react-navigation/native'

import { auth } from '../../../firebase'

export default () => {

    const navigation = useNavigation();

    const handleUpdate = () => {
        auth
        navigation.navigate("Profile")

    }

    const handleMyPet = () => {
        auth
        navigation.navigate("MyPets")

    }

    return (
        <Container>
            <WelcomeSign>
                <Text>Email: {auth.currentUser?.email}</Text>
            </WelcomeSign>

            <InputArea>

                <CustomButton onPress={handleUpdate}>
                    <CustomButtonText>Visualizar perfil</CustomButtonText>
                </CustomButton>

                <CustomButton onPress={handleMyPet}>
                    <CustomButtonText>Meus pet</CustomButtonText>
                </CustomButton>

            </InputArea>

        </Container>
    );
}