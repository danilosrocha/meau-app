import React, { Component } from 'react'
import styled from 'styled-components/native'


const FlatlistView = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    justify-content: space-around;
`;

const TextParam = styled.Text`
    font-size: 20px;
    color: black;
    margin-bottom: 5px;
`;

const TextTitle = styled.Text`
    font-size: 24px;
    color: black;
    text-align: center;
    margin-bottom: 20px;
    font-weight: bold;
`;

export default ({ item }) => {

    return (
        <FlatlistView>

            <TextParam>- - - - - - - - - - - - -</TextParam>
            <TextParam>Nome: {item.nome}</TextParam>
            <TextParam>Idade: {item.idade}</TextParam>
            <TextParam>Especie: {item.especie}</TextParam>
            <TextParam>Porte: {item.porte}</TextParam>
            <TextParam>Sexo: {item.sexo}</TextParam>

        </FlatlistView>

    )
}

