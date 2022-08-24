import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import {
  Container,
  WelcomeSign,
  ViewArea,
  FlatList,
  TitleText,
} from "./styles";

import { useNavigation } from "@react-navigation/native";
import AddToken from '../../Services/AddToken'
import Header from "../../components/Header";

import { auth, db } from "../../../firebase";

import Item from "./Item";

export default () => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const getUsers = () => {
    db.collection("Pet")
      .get()
      .then((querySnapshot) => {
        let temporyData = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().statusAdocao == true) {
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

  const renderItem = ({ item }) => <Item item={item} />;

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container>
      <Header
        title = {"Meau App"}

      />
      <ViewArea>
        <AddToken></AddToken>
        <WelcomeSign>
          <Text>Email: {auth.currentUser?.email}</Text>
        </WelcomeSign>
        <TitleText>Lista dos animais</TitleText>
        {data && (
          <FlatList
            data={data}
            renderItem={renderItem}
            contentContainerStyle={{ marginHorizontal: 30 }}
          />
        )}

      </ViewArea>
    </Container>
  );
};
