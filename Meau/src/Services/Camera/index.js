// import React, { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

// import {
//   Container,
//   ContentImg,
//   Avatar,
// } from "./styles";
// import { auth, db, storage } from "../../../firebase";

// export default () => {

//   const [profilePicture, setProfilePicture] = useState("https://sdama.org/wp-content/themes/sama/img/fallback-profile.jpg");

//   const idUser = auth.currentUser?.uid;

//   const user = auth.currentUser

//   console.log(user);

export const handleImageUser = () => {
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
  // return result
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

  return result

  // handleUpload(result.uri);
};

const pickImageFromCamera = async () => {
  console.log("-----> Clicou na Camera");

  const options = {
    noData: true,
  };

  let result = await ImagePicker.launchCameraAsync(options);

  return result
  // handleUpload(result.uri);
};



//   return (
//     <Container>
//       <ContentImg onPress={() => handleImageUser()}>
//         <Avatar source={{ uri: profilePicture }} />
//       </ContentImg>
//     </Container >
//   );
// };