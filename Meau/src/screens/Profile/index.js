import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, db, storage } from "../../../firebase";
import * as ImagePicker from "expo-image-picker";

import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  InputText,
  ScrollViewProfile,
  ContentImg,
  Avatar,
  LoadingIcon,
} from "./styles";
import SignInput from "../../components/SignInput";

export default () => {
  const navigation = useNavigation();
  const idUser = auth.currentUser.uid;

  const [name, setNameField] = useState("");
  const [fone, setFoneField] = useState("");
  const [city, setCityField] = useState("");
  const [adress, setAdressField] = useState("");
  const [birth, setBirthField] = useState("");

  const [avatar, setAvatar] = useState();

  /*USER DATA*/

  const [data, setData] = useState([]);
  const [profilePicture, setProfilePicture] = useState();

  const getUsers = () => {
    db.collection("UserData")
      .get()
      .then((querySnapshot) => {
        let temporyData = [];
        querySnapshot.forEach((doc) => {
          if (doc.id == idUser) {
            setProfilePicture(doc.data().fotoUsuario);
            const user = {
              cidade: doc.data().cidade,
              dataNascimento: doc.data().dataNascimento,
              email: doc.data().email,
              endereco: doc.data().endereco,
              nome: doc.data().nome,
              telefone: doc.data().telefone,
              fotoUsuario: doc.data().fotoUsuario,
            };
            setNameField(user.nome);
            setFoneField(user.telefone);
            setCityField(user.cidade);
            setAdressField(user.endereco);
            setBirthField(user.dataNascimento);
            setData(user);
          }
        });
      });
  };

  /*USER DATA*/
  const handleUpdateClick = () => {
    auth;
    const colect = db.collection("UserData");
    const myDoc = colect.doc(auth.currentUser?.uid);

    const data = {
      id: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      nome: name,
      telefone: fone,
      cidade: city,
      endereco: adress,
      dataNascimento: birth,
    };

    myDoc
      .update(data)
      .then(() => {
        Alert.alert("Informação", "Dados atualizado");
        navigation.navigate("RoutesTab");
      })
      .catch((error) => alert(error.message));
  };

  /* ------------------------------------------------------------*/

  const handleImageUser = () => {
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

    setAvatar({ uri: result.uri });

    handleUpload(result.uri);
  };

  const pickImageFromCamera = async () => {
    console.log("-----> Clicou na Camera");

    const options = {
      noData: true,
    };

    let result = await ImagePicker.launchCameraAsync(options);
    setAvatar({ uri: result.uri });

    handleUpload(result.uri);
  };

  async function handleUpload(file) {
    console.log("-----> Eu sou o file", file);
    const blob = await (await fetch("file://" + file)).blob();
    // console.log("----> Eu sou Blob", blob)
    const uploadTask = storage
      .ref("profilePicture/" + idUser + "/")
      .put(blob, { contentType: file.type });

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("Upload Image");
        if (snapshot.bytesTransferred !== 0) {
          getUrlImage(idUser);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  const getUrlImage = (idUser) => {
    const colect = db.collection("UserData");
    const myDoc = colect.doc(idUser);
    let imageRef = storage.ref("profilePicture/" + idUser + "/");
    imageRef
      .getDownloadURL()
      .then((url) => {
        setProfilePicture(url);

        myDoc
          .update({ fotoUsuario: url })
          .then(() => {
            Alert.alert("Perfil", "Foto atualizada");
          })
          .catch((error) => alert(error.message));
      })
      .catch((e) => console.log("getting downloadURL of image error => ", e));

    console.log(idUser);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container>
      <ScrollViewProfile>
        <InputArea>
          <ContentImg onPress={() => handleImageUser()}>
            
            
            <Avatar source={{ uri: avatar ? avatar.uri : data.fotoUsuario }} />
          </ContentImg>

          <InputText>Nome</InputText>
          <SignInput
            placeholder={data.nome}
            value={name}
            onChangeText={(t) => setNameField(t)}
          />

          <InputText>Tefelone</InputText>
          <SignInput
            placeholder={data.telefone}
            value={fone}
            onChangeText={(t) => setFoneField(t)}
          />

          <InputText>Cidade</InputText>
          <SignInput
            placeholder={data.cidade}
            value={city}
            onChangeText={(t) => setCityField(t)}
          />

          <InputText>Endereço</InputText>
          <SignInput
            placeholder={data.endereco}
            value={adress}
            onChangeText={(t) => setAdressField(t)}
          />

          <InputText>Data de nascimento</InputText>
          <SignInput
            placeholder={data.dataNascimento}
            value={birth}
            onChangeText={(t) => setBirthField(t)}
          />

          <CustomButton onPress={handleUpdateClick}>
            <CustomButtonText>Salvar</CustomButtonText>
          </CustomButton>
        </InputArea>
      </ScrollViewProfile>
    </Container>
  );
};
