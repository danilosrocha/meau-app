import React, { useEffect, useState } from 'react'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import {
  Container,
  InputArea,
  ViewArea,
  ScrollViewPet,
  CustomButton,
  CustomButtonText,
  SimpleText,
  SimpleTextBold,
  TitleTextBold,
  ContentImg,
  PetPicture

} from './styles'

import SignInput from '../../components/SignInput'
import { useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker'
import { Alert } from 'react-native'
import { auth, db, storage } from '../../../firebase'
import * as ImagePicker from 'expo-image-picker';


export default () => {

  const navigation = useNavigation();

  const [name, setNameField] = useState();
  const [sex, setSexField] = useState("Macho");
  const [specie, setSpecieField] = useState("Cachorro");
  const [size, setSizeField] = useState("Pequeno");
  const [age, setAgeField] = useState("Filhote");
  const [petAvatar, setPetAvatar] = useState();


  const petPicture = "https://static.thenounproject.com/png/703110-200.png"
  const id = uuidv4()


  const handleRegisterClick = () => {
    auth
    const colect = db.collection("Pet")
    const myDoc = colect.doc()
    const petPicture = "https://static.thenounproject.com/png/703110-200.png"

    const data = {
      "DonoId": auth.currentUser?.uid,
      "nome": name,
      "sexo": sex,
      "especie": specie,
      "porte": size,
      "idade": age,
      "fotoPet": petPicture,
      "id": id
    }
    myDoc.set(data)
      .then(() => {
        alert("Lista de Animais atualizada com sucesso!")
        navigation.navigate("MyPets")
      }).catch(error => alert(error.message))
  }

  const handleCancelClick = () => {
    auth
    navigation.navigate("Home")
  }

  // const getUsers = () => {
  //   db
  //     .collection("Pet")
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         if (doc.data().id == id) {
  //             handleImageUser
  //             setPetPicture(doc.data().fotoUsuario)       
  //         }
  //       });
  //     });
  // };

  /* -------------------------------------*/


  const handlePictureResgister = () => {
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
        onDismiss: () => console.log('----> Ação cancelada')
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

    setPetAvatar({ uri: result.uri })

    handleUpload(result.uri)
  }


  const pickImageFromCamera = async () => {
    console.log("-----> Clicou na Camera")

    const options = {
      noData: true,
    }

    let result = await ImagePicker.launchCameraAsync(options)
    setPetAvatar({ uri: result.uri })

    handleUpload(result.uri)

  }

  async function handleUpload(file) {
    console.log("-----> Eu sou o file", file)
    const blob = await (await fetch('file://' + file)).blob()
    // console.log("----> Eu sou Blob", blob)
    const uploadTask = storage.ref('profilePetPicture/' + id + '/').put(blob, { contentType: file.type })

    uploadTask.on('state_changed', (snapshot) => {
      console.log("Upload Image")
    }, (error) => {
      console.log(error)
    })
  }

  return (
    <Container>

      <ScrollViewPet>

        <InputArea>

          <TitleTextBold>Adicione os dados do pet</TitleTextBold>

          <SignInput
            placeholder="Nome"
            value={name}
            onChangeText={t => setNameField(t)}
          />

          <SimpleTextBold>Selecione o sexo do animal</SimpleTextBold>
          <Picker
            style={{ height: 50, width: 150 }}
            selectedValue={sex}
            onValueChange={(itemValue, itemIndex) =>
              setSexField(itemValue)}
          >
            <Picker.Item label="Macho" value="Macho" />
            <Picker.Item label="Femea" value="Femea" />
          </Picker>

          <SimpleTextBold>Selecione a especie do animal</SimpleTextBold>
          <Picker
            style={{ height: 50, width: 200 }}
            selectedValue={specie}
            onValueChange={(itemValue, itemIndex) =>
              setSpecieField(itemValue)}
          >
            <Picker.Item label="Cachorro" value="Cachorro" />
            <Picker.Item label="Gato" value="Gato" />
          </Picker>

          <SimpleTextBold>Selecione o porte do animal</SimpleTextBold>
          <Picker
            style={{ height: 50, width: 200 }}
            selectedValue={size}
            onValueChange={(itemValue, itemIndex) =>
              setSizeField(itemValue)}
          >
            <Picker.Item label="Pequeno" value="Pequeno" />
            <Picker.Item label="Médio" value="Médio" />
            <Picker.Item label="Grande" value="Grande" />
          </Picker>

          <SimpleTextBold>Selecione a idade do animal</SimpleTextBold>
          <Picker
            style={{ height: 50, width: 200 }}
            selectedValue={age}
            onValueChange={(itemValue, itemIndex) =>
              setAgeField(itemValue)}
          >
            <Picker.Item label="Filhote" value="Filhote" />
            <Picker.Item label="Adulto" value="Adulto" />
            <Picker.Item label="Idoso" value="Idoso" />
          </Picker>

          <CustomButton onPress={handlePictureResgister}>

            <CustomButtonText>Cadastrar Fotos</CustomButtonText>
          </CustomButton>

          <CustomButton onPress={handleRegisterClick}>
            <CustomButtonText>Cadastrar pet</CustomButtonText>
          </CustomButton>

          <CustomButton onPress={handleCancelClick}>
            <CustomButtonText>Cancelar</CustomButtonText>
          </CustomButton>

        </InputArea>

      </ScrollViewPet>

    </Container>
  );
}
