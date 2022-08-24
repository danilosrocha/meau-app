import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, db, storage } from "../../../firebase";
import * as ImagePicker from "expo-image-picker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Picker } from "@react-native-picker/picker";
import NotificationInbox from "../NotificationInbox";

import {
  Container,
  InputArea,
  ViewArea,
  ScrollViewPet,
  CustomButton,
  CustomButtonText,
  Input,
  SimpleTextBold,
  TitleTextBold,
  InputFields,
  InputField,
  CustomButtonPicture,
  PetPicture,
} from "./styles";

export default (object) => {
  const navigation = useNavigation();

  const [name, setNameField] = useState("");
  const [sex, setSexField] = useState("");
  const [specie, setSpecieField] = useState("");
  const [size, setSizeField] = useState("");
  const [age, setAgeField] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("");
  const [petAvatar, setPetAvatar] = useState("");
  const [fileName, setFileName] = useState("");
  const [petProfilePicture, setPetProfilePicture] = useState("");
  const [data, setData] = useState([]);

  const idPet = object.route.params.idPet;

  const getUsers = () => {
    db.collection("Pet")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().id == idPet) {
            const pet = {
              donoId: doc.data().donoId,
              nome: doc.data().nome,
              sexo: doc.data().sexo,
              especie: doc.data().especie,
              porte: doc.data().porte,
              idade: doc.data().idade,
              fotoPet: doc.data().fotoPet,
              id: doc.data().id,
              fileNamePicture: doc.data().fileNamePicture,
              statusAdocao: doc.data().statusAdocao,
            };
            setNameField(pet.nome);
            setSexField(pet.sexo);
            setSpecieField(pet.especie);
            setSizeField(pet.porte);
            setAdoptionStatus(pet.statusAdocao);
            setAgeField(pet.idade);
            setFileName(pet.fileNamePicture);
            setPetProfilePicture(pet.fotoPet);
            setData(pet);
          }
        });
      });
  };

  /*USER DATA*/
  const handleUpdateClick = () => {
    auth;
    const colect = db.collection("Pet");
    const myDoc = colect.doc(idPet);
    console.log("----> Eu sou o id do Pet", idPet)
    // const petPicture = "https://static.thenounproject.com/png/703110-200.png"

    const data = {
      donoId: auth.currentUser?.uid,
      nome: name,
      sexo: sex,
      especie: specie,
      porte: size,
      idade: age,
      fotoPet: petProfilePicture,
      id: idPet,
      fileNamePicture: fileName,
      statusAdocao: adoptionStatus,
    };

    myDoc
      .update(data)
      .then(() => {
        Alert.alert("Info","Dados do Pet atualizados");
        navigation.reset({
          routes: [{ name: 'RoutesTab' }]
        });
      })
      .catch((error) => alert(error.message));
  };

  const handleListRequest = (idPet) => {
    console.log(`>>>>>>>>>> Pet Profile: ${idPet}`);
    navigation.navigate('Solicitações de adoção', {
      idPet: idPet,
    });
  }
  /* ------------------------------------------------------------*/

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
      selectionLimit: 1, // Se deixar 1, será permitido apenas uma foto e 0 várias
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    };

    let result = await ImagePicker.launchImageLibraryAsync(options);

    setPetAvatar({ uri: result.uri });

    handleUpload(result.uri);
  };

  const pickImageFromCamera = async () => {
    console.log("-----> Clicou na Camera");

    const options = {
      noData: true,
    };

    let result = await ImagePicker.launchCameraAsync(options);
    setPetAvatar({ uri: result.uri });

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
        setPetProfilePicture(url);
      })
      .catch((e) => console.log("getting downloadURL of image error => ", e));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container>
      <ScrollViewPet>
        <InputArea>

          <CustomButtonPicture onPress={handlePictureResgister}>
            {!!data.fotoPet && <PetPicture source={{ uri: data.fotoPet }} />}
          </CustomButtonPicture>

          <Input
            placeholder={data.nome}
            value={name}
            onChangeText={(t) => setNameField(t)}
          />

          <InputFields>
            <InputField>
              <TitleTextBold>Sexo</TitleTextBold>
              <Picker
                style={{ height: 50, width: 130 }}
                selectedValue={sex}
                onValueChange={(itemValue, itemIndex) => setSexField(itemValue)}
              >
                <Picker.Item label="Macho" value="Macho" />
                <Picker.Item label="Femea" value="Femea" />
              </Picker>
            </InputField>



            <InputField>
              <TitleTextBold>Porte</TitleTextBold>
              <Picker
                style={{ height: 50, width: 130 }}
                selectedValue={size}
                onValueChange={(itemValue, itemIndex) => setSizeField(itemValue)}
              >
                <Picker.Item label="Pequeno" value="Pequeno" />
                <Picker.Item label="Médio" value="Médio" />
                <Picker.Item label="Grande" value="Grande" />
              </Picker>
            </InputField>


            <InputField>
              <TitleTextBold>Idade</TitleTextBold>
              <Picker
                style={{ height: 50, width: 130 }}
                selectedValue={age}
                onValueChange={(itemValue, itemIndex) => setAgeField(itemValue)}
              >
                <Picker.Item label="Filhote" value="Filhote" />
                <Picker.Item label="Adulto" value="Adulto" />
                <Picker.Item label="Idoso" value="Idoso" />
              </Picker>
            </InputField>

          </InputFields>

          <SimpleTextBold>Animal para adoção?</SimpleTextBold>
          <Picker
            selectedValue={adoptionStatus}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setAdoptionStatus(itemValue)}
          >
            <Picker.Item label="Disponível" value={true} />
            <Picker.Item label="Não disponível" value={false} />
          </Picker>

          <CustomButton onPress={handleUpdateClick}>
            <CustomButtonText>Atualizar dados do pet</CustomButtonText>
          </CustomButton>

          <CustomButton onPress={() => handleListRequest(idPet)}>
            <CustomButtonText>Lista de requisições de adoção</CustomButtonText>
          </CustomButton>
        </InputArea>
      </ScrollViewPet>
    </Container>
  );
};


/*<Container>
    <ScrollViewPet>
      <InputArea>
        <TitleTextBold>Adicione os dados do pet</TitleTextBold>

        <SignInput
          placeholder="Nome"
          value={name}
          onChangeText={(t) => setNameField(t)}
        />

        <CustomButtonPicture onPress={handlePictureResgister}>
          <CustomButtonText>Cadastrar Fotos</CustomButtonText>
        </CustomButtonPicture>

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

        <CustomButton onPress={handleRegisterClick}>
          <CustomButtonText>Cadastrar pet</CustomButtonText>
        </CustomButton>

        <CustomButton onPress={handleCancelClick}>
          <CustomButtonText>Cancelar</CustomButtonText>
        </CustomButton>
      </InputArea>
    </ScrollViewPet>
  </Container> */

