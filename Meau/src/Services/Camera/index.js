import React, { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

import {
  Container,
  ContentImg,
  Avatar,
} from "./styles";
import { auth, db, storage } from "../../../firebase";

export default () => {

  const [profilePicture, setProfilePicture] = useState("https://sdama.org/wp-content/themes/sama/img/fallback-profile.jpg");

  const idUser = auth.currentUser?.uid;

  const user = auth.currentUser
  console.log(user);

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

    handleUpload(result.uri);
  };

  const pickImageFromCamera = async () => {
    console.log("-----> Clicou na Camera");

    const options = {
      noData: true,
    };

    let result = await ImagePicker.launchCameraAsync(options);

    handleUpload(result.uri);
  };

  async function handleUpload(file) {
    console.log("-----> Eu sou o file", file);
    const blob = await (await fetch("file://" + file)).blob();
    // console.log("----> Eu sou Blob", blob)
    const uploadTask = storage
      .ref("profilePicture/" + user.uid + "/")
      .put(blob, { contentType: file.type });

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("Upload Image");
        let progress = snapshot.bytesTransferred / snapshot.totalBytes
        if (progress === 1) {
          console.log(progress);
          setTimeout(function () {
            getUrlImage(idUser);
          }, 2000);
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
    console.log(">>>>>>>>>>>> GET URL");
    imageRef
      .getDownloadURL()
      .then((url) => {
        setProfilePicture(url);
        user.updateProfile({
          photoURL: url
        }).then(() => {
          console.log(">>>>>>>>> URL", url);
        }).catch((error) => {
          console.log(">>>>>>>>> ERRO", error);
        });
        myDoc
          .set({ fotoUsuario: url })
          .then(() => {
            Alert.alert("Perfil", "Foto atualizada");
          })
          .catch((error) => alert(error.message));
      })
      .catch((e) => console.log("getting downloadURL of image error => ", e));

    console.log(idUser);
  };

  return (
    <Container>
      <ContentImg onPress={() => handleImageUser()}>
        <Avatar source={{ uri: profilePicture }} />
      </ContentImg>
    </Container >
  );
};
