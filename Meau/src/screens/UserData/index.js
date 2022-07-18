import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { doc, setDoc } from "firebase/firestore"
import {
    Container,
    WelcomeSign,
    ViewArea,
    CustomButton,
    CustomButtonText,

} from './styles'

import { useNavigation } from '@react-navigation/native'

import { auth } from '../../../firebase'



export default () => {

    const [data, setData] = useState([]);

    const navigation = useNavigation();

    const handleHome = () => {

        navigation.navigate("Home")

    }

    return (
        <Container>
            <WelcomeSign>Email: {auth.currentUser?.email}</WelcomeSign>

            <ViewArea>

                <CustomButton onPress={handleHome}>
                    <CustomButtonText>Voltar para página inicial</CustomButtonText>
                </CustomButton>

            </ViewArea>

        </Container>
    );
}