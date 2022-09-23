import React, { Component } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const FlatlistView = styled.TouchableOpacity`
  width: 90%;
  height: 90%;
  flex: 1;
  margin-bottom: 20px;
  border-radius: 30px;
  background-color: #4444;
  justify-content: center;
  align-items: center;
  margin-left: 4%;
`;

const TextParam = styled.Text`
  font-size: 20px;
  color: black;
  margin-bottom: 5px;
`;

const ImagePet = styled.Image`
  height: 100px;
  aspect-ratio: 1;
`;

export default ({ item }) => {

  const navigation = useNavigation();

  const handlePetClick = (idPet) => {
    navigation.navigate('Perfil Pet', {
      idPet: idPet,
    });
  }

  return (
    <FlatlistView onPress={() => handlePetClick(item.id)}>
      {!!item.fotoPet && <ImagePet source={{ uri: item.fotoPet }} />}
      <TextParam>Nome: {item.nome}</TextParam>
      <TextParam>Idade: {item.idade}</TextParam>
      <TextParam>Especie: {item.especie}</TextParam>
      <TextParam>Porte: {item.porte}</TextParam>
      <TextParam>Sexo: {item.sexo}</TextParam>
    </FlatlistView>
  );
};
