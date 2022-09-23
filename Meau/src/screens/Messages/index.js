import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import HeaderBack from "../../components/HeaderBack";
import { auth, db } from '../../../firebase'
import ItemContact from "./ItemContact";
import ItemEmpty from "./ItemEmpty";

import {
  Container,
  InputArea,
  FlatList,
} from "./styles";

export default () => {

  const [data, setData] = useState()

  const idUser = auth.currentUser.uid;

  const getUsers = () => {
    db.collection("UserData")
      .get()
      .then((querySnapshot) => {
        let temporyData = [];
        querySnapshot.forEach((doc) => {
          if (idUser !== doc.data().id) {
            const user = {
              fotoUsuario: doc.data().fotoUsuario,
              nome: doc.data().nome,
              id: doc.data().id,

            };
            temporyData.push(user);
          }
        });
        setData(temporyData);
      });
  };

  useEffect(() => {
    getUsers()
  }, []);

  const renderItem = ({ item }) => <ItemContact item={item} />;
  const renderEmpty = () => <ItemEmpty />;

  return (
    <Container>
      <HeaderBack
        title={"Mensagens"}
      />
      <InputArea>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
        />
      </InputArea>
    </Container>
  );
};

