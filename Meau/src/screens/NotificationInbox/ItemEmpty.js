import React, { Component } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const FlatlistView = styled.View`
  width: 100%;
  height: 90%;
  flex: 1;
  justify-content: center;
  align-items: center;
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

export default () => {

  return (
    <FlatlistView>
      <TextParam>Nâo há requisições</TextParam>
    </FlatlistView>
  );
};
