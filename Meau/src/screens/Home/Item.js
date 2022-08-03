import React, { Component } from "react";
import styled from "styled-components/native";

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
  return (
    <FlatlistView>
      {!!item.fotoPet && <ImagePet source={{ uri: item.fotoPet }} />}
      <TextParam>{item.nome}</TextParam>

    </FlatlistView>
  );
};
