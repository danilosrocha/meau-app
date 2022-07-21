import React, { useEffect, useState } from 'react'
import { Alert, ToastAndroid } from 'react-native'
import {
    Container,
    WelcomeSign,
    ViewArea,
    CustomButton,
    CustomButtonText,
    FlatList,

} from './styles'

import { useNavigation } from '@react-navigation/native'

import { auth, db } from '../../../firebase'

import Item from './Item'

export default () => {
    const idUser = auth.currentUser?.uid;
    const [data, setData] = useState([]);
    const getUsers = () => {
        db
        .collection("UserData")
        .get()
        .then((querySnapshot) =>{
            let temporyData = []
            querySnapshot.forEach((doc) =>{
                if (doc.id == idUser) {
                    if (doc.data().nome == "") {
                        navigation.navigate("UpdateUserData")
                        Alert.alert("Faltam dados para conta!")

                    } else {
                        const user = {
                            cidade: doc.data().cidade,
                            dataNascimento: doc.data().dataNascimento,
                            email: doc.data().email,
                            endereco: doc.data().endereco,
                            nome: doc.data().nome,
                            telefone: doc.data().telefone, 
                        }
                        temporyData.push(user)
                    }
                    
                }
            });
            setData(temporyData)
        });
    };

    const navigation = useNavigation();
    
    useEffect(() => {
        getUsers();
    }, []);    

    const handleHome = () => {
        navigation.navigate("Home")
        ToastAndroid.show(
            "Lembre-se de manter seu cadastro atualizado!",
            ToastAndroid.LONG,
        )
    }

    const renderItem = ({ item }) => (
         <Item item={item} />
    )
    
    return (
        <Container>
            <ViewArea>
                
                <FlatList
                    data = {data}
                    renderItem = {renderItem}
                />
            
                <CustomButton onPress={handleHome}>
                    <CustomButtonText>Voltar para página inicial</CustomButtonText>
                </CustomButton>
            </ViewArea>
            

        </Container>
    );
}