import React, { Component } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const FlatlistView = styled.TouchableOpacity`
  width: 100%;
  height: 90%;
  flex: 1;
  margin-bottom: 20px;
  border-radius: 30px;
  background-color: #4444;
  justify-content: center;
  align-items: center;
`;

const TextParam = styled.Text`
  font-size: 20px;
  color: black;
  margin-bottom: 5px;
  margin-top: 5px;
`;

const ImagePet = styled.Image`
  height: 200px;
  width: 300px;
  margin-top: 20px;
  border-radius: 30px;
  
  /* aspect-ratio: 2; */
`;



export default ({ item }) => {

  const navigation = useNavigation();

  const handlePetClick = (idPet) => {
    navigation.navigate('Adotar Pet', {
      idPet: idPet,
    });
  }

  return (
    <FlatlistView onPress={() => handlePetClick(item.id)}>
      {!!item.fotoPet && <ImagePet source={{ uri: item.fotoPet }} />}
      <TextParam>{item.nome}</TextParam>

    </FlatlistView>
  );
};
