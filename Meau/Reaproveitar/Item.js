import React, { Component } from 'react'
import styled from 'styled-components/native'


const ButtonView = styled.View`
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

export default ({item}) =>{

    return (
        <ButtonView>
            <TextTitle>Dados da Conta</TextTitle>
            <TextParam>Nome: {item.nome}</TextParam>
            <TextParam>Email: {item.email}</TextParam>
            <TextParam>Telefone: {item.telefone}</TextParam>
            <TextParam>Data de nascimento: {item.dataNascimento}</TextParam>
            <TextParam>Cidade: {item.cidade}</TextParam>
            <TextParam>Endereço: {item.endereco}</TextParam>
        </ButtonView>
        
    )
  }

