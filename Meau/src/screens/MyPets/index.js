import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import {
    Container,
    ViewArea,
    CustomButton,
    CustomButtonText,
    FlatList,
    TitleText,

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
            .then((querySnapshot) => {
                let temporyData = []
                querySnapshot.forEach((doc) => {
                    if (idUser == doc.data().DonoId) {
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

    const renderItem = ({ item }) => (
        <Item item={item} />
    )

    return (
        <Container>

            <ViewArea>
                <TitleText>Lista de meus animais</TitleText>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    contentContainerStyle={{justifyContent: 'center'}}
                />
                <CustomButton onPress={handleUpdatePet}>
                    <CustomButtonText>Adicionar pet</CustomButtonText>
                </CustomButton>


            </ViewArea>

        </Container>
    );
}