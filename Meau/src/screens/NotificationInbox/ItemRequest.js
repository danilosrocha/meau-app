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

  const handleRequestClick = (idRequestingUser, idPet) => {
    navigation.navigate('Requisição', {
      idRequestingUser: idRequestingUser,
      idPet: idPet,
    });
  }

  return (
    <FlatlistView onPress={() => handleRequestClick(item.idRequestingUser, item.idPet)}>
      <TextParam>{item.title}</TextParam>
      <TextParam>{item.body}</TextParam>
    </FlatlistView>
  );
};
