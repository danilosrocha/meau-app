import React from 'react';
import styled from 'styled-components';
import { Image } from 'react-native';

const InputArea = styled.View`
    width: 100%;
    height: 60px;
    background-color: #4444;
    border-radius: 30px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
`;

const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
`;

export default ({placeholder, value, onChangeText, password}) => {
    return (
        <InputArea>
            
            <Input
                secureTextEntry={password}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                
            />
        </InputArea>
    );
}
