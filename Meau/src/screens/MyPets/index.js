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

import { auth, db, storage } from '../../../firebase'

import Item from './Item'

export default () => {

    const navigation = useNavigation();



    const handleUpdatePet = () => {
        auth
        navigation.navigate("UpdatePet")
    }

    const idUser = auth.currentUser?.uid;
    const [data, setData] = useState([]);
    const [petProfilePicture, setPetProfilePicture] = useState();

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
                            id: doc.data().id
                        }
                        console.log("----> User id",user.id)
                        temporyData.push(user)
                    }
                });
                setData(temporyData)
            });
    };
    /*Possivel solucao para imagens*/
    // useEffect(() => {
    //     getUsers();
    //     let imageRef = storage.ref('profilePetPicture/');
    //     imageRef
    //         .getDownloadURL()
    //         .then((url) => {
    //             setPetProfilePicture(url);

    //         })
    //         .catch((e) => console.log('getting downloadURL of image error => ', e));

    //     console.log("----> Data id",data.id)
    //     //console.log(imageRef)
    // }, []);

    const renderItem = ({ item }) => (
        <Item item={item} />
    )
    console.log(data)
    return (
        <Container>

            <ViewArea>
                <TitleText>Lista de meus animais</TitleText>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    contentContainerStyle={{ justifyContent: 'center' }}
                />
                <CustomButton onPress={handleUpdatePet}>
                    <CustomButtonText>Adicionar pet</CustomButtonText>
                </CustomButton>


            </ViewArea>

        </Container>
    );
}