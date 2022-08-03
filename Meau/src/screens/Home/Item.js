import React, { Component } from 'react'
import styled from 'styled-components/native'


const FlatlistView = styled.TouchableOpacity`
    width: 90%;
    height: 90%;
    flex:1;
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

export default ({ item }) => {
 
    return (
        <FlatlistView>

            <TextParam>Nome: {item.nome}</TextParam>
            <TextParam>Idade: {item.idade}</TextParam>
            <TextParam>Especie: {item.especie}</TextParam>
            <TextParam>Porte: {item.porte}</TextParam>
            <TextParam>Sexo: {item.sexo}</TextParam>

        </FlatlistView>

    )
}
