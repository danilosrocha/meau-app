import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import {
  Container,
  WelcomeSign,
  InputArea,
  CustomButton,
  CustomButtonText,
  ViewArea,
  FlatList,
  TitleText,
} from "./styles";

import { useNavigation } from "@react-navigation/native";

import { auth, db } from "../../../firebase";

import Item from "./Item";

export default () => {
  const navigation = useNavigation();

  const handleUpdate = () => {
    auth;
    navigation.navigate("Profile");
  };

  const handleMyPet = () => {
    auth;
    navigation.navigate("MyPets");
  };

  const [data, setData] = useState([]);
  const getUsers = () => {
    db.collection("Pet")
      .get()
      .then((querySnapshot) => {
        let temporyData = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().adoptionStatus == true) {
            const user = {
              sexo: doc.data().sexo,
              idade: doc.data().idade,
              porte: doc.data().porte,
              especie: doc.data().especie,
              nome: doc.data().nome,
              id: doc.data().id,
              fotoPet: doc.data().fotoPet,
            };
            temporyData.push(user);
          }
        });
        setData(temporyData);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const renderItem = ({ item }) => <Item item={item} />;
  console.log(data);

  return (
    <Container>
      <ViewArea>
        <WelcomeSign>
          <Text>Email: {auth.currentUser?.email}</Text>
        </WelcomeSign>
        <TitleText>Lista dos animais</TitleText>
        <FlatList
          data={data}
          renderItem={renderItem}
          contentContainerStyle={{ justifyContent: "center" }}
        />
      </ViewArea>
    </Container>
  );
};
