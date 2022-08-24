import React, { useEffect, useState } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import {
  Container,
  InputArea,
  ViewArea,
  ViewAreaPicker,
  ScrollViewPet,
  CustomButton,
  CustomButtonText,
  CustomViewPicture,
  SimpleTextBold,
  TitleTextBold,
  CustomButtonPicture,
  PetPicture,
} from "./styles";

import ButtonRequest from "../../components/ButtonRequest";
import SignInput from "../../components/SignInput";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { Alert } from "react-native";
import { auth, db, storage } from "../../../firebase";
import * as ImagePicker from "expo-image-picker";

export default () => {
  const navigation = useNavigation();

  const [name, setNameField] = useState();
  const [sex, setSexField] = useState("Macho");
  const [specie, setSpecieField] = useState("Cachorro");
  const [size, setSizeField] = useState("Pequeno");
  const [age, setAgeField] = useState("Filhote");
  const [adoptionStatus, setAdoptionStatus] = useState(true);
  const [avatar, setAvatar] = useState();
  const [fileName, setFileName] = useState("padrão");
  const [petProfilePicture, setPetProfilePicture] = useState();
  const [loading, setLoading] = useState(false)
  const idPet = uuidv4();

  const handleRegisterClick = () => {
    auth;
    const colect = db.collection("Pet");
    const myDoc = colect.doc(idPet);
    const fotoPet = petProfilePicture ? petProfilePicture : "https://static.thenounproject.com/png/703110-200.png"

    const data = {
      donoId: auth.currentUser?.uid,
      nome: name,
      sexo: sex,
      especie: specie,
      porte: size,
      idade: age,
      fotoPet: fotoPet,
      id: idPet,
      fileNamePicture: fileName,
      statusAdocao: adoptionStatus,
    };

    myDoc
      .set(data)
      .then(() => {
        alert("Lista de Animais atualizada com sucesso!");
        navigation.navigate("Meus Pets");
      })
      .catch((error) => alert(error.message));
  };

  const handleCancelClick = () => {
    auth;
    navigation.navigate("Inicio");
  };

  const handlePictureResgister = () => {
    Alert.alert(
      "Selecione",
      "Informe de onde você quer pegar a foto",
      [
        {
          text: "Galeria",
          onPress: () => pickImageFromGalery(),
          style: "default",
        },
        {
          text: "Camera",
          onPress: () => pickImageFromCamera(),
          style: "default",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => console.log("----> Ação cancelada"),
      }
    );
  };

  const pickImageFromGalery = async () => {
    console.log("-----> Clicou na Galeria");
    const options = {
      noData: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    };

    let result = await ImagePicker.launchImageLibraryAsync(options);

    handleUpload(result.uri);
  };

  const pickImageFromCamera = async () => {
    console.log("-----> Clicou na Camera");

    const options = {
      noData: true,
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      allowsEditing: true,
    };

    let result = await ImagePicker.launchCameraAsync(options);

    handleUpload(result.uri);
  };

  async function handleUpload(file) {
    const fileName = uuidv4();
    setFileName(fileName);
    const donoID = auth.currentUser?.uid;
    const blob = await (await fetch("file://" + file)).blob();
    // console.log("----> Eu sou Blob", blob)
    const uploadTask = storage
      .ref("profilePetPicture/" + donoID + "/" + fileName)
      .put(blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("Upload Image");
        setLoading(true)
        if (snapshot.bytesTransferred !== 0) {
          getUrlImage(donoID, fileName);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  const getUrlImage = (donoID, fileName) => {
    let imageRef = storage.ref("profilePetPicture/" + donoID + "/" + fileName);
    imageRef
      .getDownloadURL()
      .then((url) => {
        setAvatar(url)
        setPetProfilePicture(url);
        setLoading(false)
      })
      .catch((e) => console.log("getting downloadURL of image error => ", e));
  };

  return (
    <Container>
      <ScrollViewPet>
        <InputArea>
          <TitleTextBold>Adicione os dados do pet</TitleTextBold>

          <SignInput
            placeholder="Nome"
            value={name}
            onChangeText={(t) => setNameField(t)}
          />

          <ViewArea>
            {avatar && (
              <CustomViewPicture>
                <PetPicture source={{ uri: petProfilePicture }} />
              </CustomViewPicture>
            )}

          </ViewArea>

          <ButtonRequest 
          title={"Cadastrar foto do pet"}
          onPress={handlePictureResgister}
          isLoading={loading}
          >

          </ButtonRequest>

          <ViewAreaPicker>
            <SimpleTextBold>Selecione o sexo do animal</SimpleTextBold>
            <Picker
              style={{ height: 50, width: 150 }}
              selectedValue={sex}
              onValueChange={(itemValue, itemIndex) => setSexField(itemValue)}
            >
              <Picker.Item label="Macho" value="Macho" />
              <Picker.Item label="Femea" value="Femea" />
            </Picker>

            <SimpleTextBold>Selecione a especie do animal</SimpleTextBold>
            <Picker
              style={{ height: 50, width: 200 }}
              selectedValue={specie}
              onValueChange={(itemValue, itemIndex) => setSpecieField(itemValue)}
            >
              <Picker.Item label="Cachorro" value="Cachorro" />
              <Picker.Item label="Gato" value="Gato" />
            </Picker>

            <SimpleTextBold>Selecione o porte do animal</SimpleTextBold>
            <Picker
              style={{ height: 50, width: 200 }}
              selectedValue={size}
              onValueChange={(itemValue, itemIndex) => setSizeField(itemValue)}
            >
              <Picker.Item label="Pequeno" value="Pequeno" />
              <Picker.Item label="Médio" value="Médio" />
              <Picker.Item label="Grande" value="Grande" />
            </Picker>

            <SimpleTextBold>Selecione a idade do animal</SimpleTextBold>
            <Picker
              style={{ height: 50, width: 200 }}
              selectedValue={age}
              onValueChange={(itemValue, itemIndex) => setAgeField(itemValue)}
            >
              <Picker.Item label="Filhote" value="Filhote" />
              <Picker.Item label="Adulto" value="Adulto" />
              <Picker.Item label="Idoso" value="Idoso" />
            </Picker>

            <SimpleTextBold>Animal para adoção?</SimpleTextBold>
            <Picker
              selectedValue={adoptionStatus}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setAdoptionStatus(itemValue)}
            >
              <Picker.Item label="True" value={true} />
              <Picker.Item label="False" value={false} />
            </Picker>
          </ViewAreaPicker>



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
};
