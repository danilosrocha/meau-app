import React, { Component } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const FlatlistView = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  flex: 1;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 20px;
  background-color: #4444;
  justify-content: center;
  align-items: center;
`;

const TextParam = styled.Text`
  font-size: 20px;
  color: black;
  text-align: justify;
`;

const ImagePet = styled.Image`
  height: 100px;
  aspect-ratio: 1;
`;

export default ({ item }) => {

  const navigation = useNavigation();

  const handleRequestClick = (idRequestingUser, idPet, idReq, request) => {
    navigation.navigate('Requisição', {
      idRequestingUser: idRequestingUser,
      idPet: idPet,
      idReq: idReq,
      request: request,
    });
  }

  console.log(">>>>>>>>>>>>> ITEM", item);

  return (
    <FlatlistView onPress={() => handleRequestClick(item.idRequestingUser, item.idPet, item.idReq, item.request)}>
      <TextParam>{item.title}</TextParam>
      <TextParam>{item.body}</TextParam>
    </FlatlistView>
  );
};
