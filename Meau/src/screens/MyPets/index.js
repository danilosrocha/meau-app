import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Alert } from 'react-native'
import {
    Container,
    ViewArea,
    CustomButton,
    CustomButtonText,
    FlatList,

} from './styles'

import { useNavigation } from '@react-navigation/native'

import { auth, db } from '../../../firebase'

import Item from './Item'

export default () => {

    const navigation = useNavigation();

    const handleUpdatePet = () => {
        auth

        navigation.navigate("UpdatePet")

    }
    const idUser = auth.currentUser?.uid;
    const [data, setData] = useState([]);
    const getUsers = () => {
        db
        .collection("Pet")
        .get()
        .then((querySnapshot) =>{
            let temporyData = []
            querySnapshot.forEach((doc) =>{
                if(idUser==doc.data().DonoId){
                    const user = {
                        sexo: doc.data().sexo,
                        idade: doc.data().idade,
                        porte: doc.data().porte,
                        especie: doc.data().especie,
                        nome: doc.data().nome,
                    }
                    temporyData.push(user)   
                }
            });
            setData(temporyData)
        });
    };


    useEffect(() => {
        getUsers();
    }, []);    

    const handleHome = () => {
        navigation.navigate("Home")
    }

    const renderItem = ({ item }) => (
         <Item item={item} />
    )

    console.log(data)
    
    return (
        <Container>

            <ViewArea>
                
                <FlatList
                    data = {data}
                    renderItem = {renderItem}
                />


            </ViewArea>

            <CustomButton onPress={handleUpdatePet}>
                    <CustomButtonText>Adicionar pet</CustomButtonText>
            </CustomButton>

            <CustomButton onPress={handleHome}>
                <CustomButtonText>Voltar para página inicial</CustomButtonText>
            </CustomButton>
            

        </Container>
    );
}