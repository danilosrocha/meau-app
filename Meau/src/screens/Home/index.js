import React, { useEffect, useState } from "react";
import {
  Container,
  ViewArea,
  FlatList,
  TitleText,
} from "./styles";

import { useNavigation } from "@react-navigation/native";
import AddToken from '../../Services/AddToken'
import Header from "../../components/HeaderMessage";

import { auth, db } from "../../../firebase";

import Item from "./Item";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export default () => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = React.useState(false);
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

  const onRefresh = async () => {
    setIsFetching(true);
    await sleep(2000);
    setIsFetching(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container>

      <Header
        title={"Meau App"}
      />

      <ViewArea>

        <AddToken></AddToken>

        <TitleText>Lista dos animais</TitleText>
        {data && (
          <FlatList
            data={data}
            renderItem={renderItem}
            contentContainerStyle={{ marginHorizontal: 20 }}
            onRefresh={onRefresh}
            refreshing={isFetching}
          />
        )}

      </ViewArea>

    </Container>
  );
};
