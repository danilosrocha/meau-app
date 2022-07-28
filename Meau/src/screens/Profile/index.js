import React from 'react'
import { Alert } from 'react-native'
//import ImagePicker from 'react-native-image-picker'
import { launchImageLibrary } from "react-native-image-picker"
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native'
import {
    Container,
    WelcomeSign,
    AreaButtons,
    CustomButton,
    CustomButtonText,
    Avatar,
    ContentImg,

} from './style'

export default () => {
    //const navigation = useNavigation();
    const handleImageUser = () => {
        Alert.alert(
            "Selecione",
            "Informe de onde você quer pegar a foto",
            [
                {
                    text: "Galeria",
                    onPress: () => pickImageFromGalery(),
                    style: "default"
                },
                {
                    text: "Camera",
                    onPress: () => pickImageFromCamera(),
                    style: "default"
                }
            ],
            {
                cancelable: true,
                onDismiss: () => console.log('tratar depois...')
            }
        )
    }

    const pickImageFromGalery = async () => {
        console.log("-----> Clicou na Galeria")
        const options = {
            noData: true,
            selectionLimit: 1, // Se deixar 1, será permitido apenas uma foto e 0 várias
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
        }

        let result = await ImagePicker.launchImageLibraryAsync(options)
        console.log(result.uri)

    }

    const pickImageFromCamera = async () => {
        console.log("-----> Clicou na Camera")

        const options = {
            noData: true,
        }

        let result = await ImagePicker.launchCameraAsync(options)
        console.log(result.uri)
    }

    return (
        <Container>
            <AreaButtons>
                <ContentImg onPress={() => handleImageUser()}>
                    <Avatar
                        source={{ uri: "https://sdama.org/wp-content/themes/sama/img/fallback-profile.jpg" }}
                    />
                </ContentImg>
            </AreaButtons>
        </Container>
    );
}
