import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #58BD97;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const SimpleText = styled.Text`
    font-size: 20px;
    color: #000000;
    margin-top: 20px;
`;

export const WelcomeSign = styled.Text`
    font-size: 24px;
    color: #000000;
    margin-top: 60px;
    height: 60px;
`;

export const InputArea = styled.View`
    width: 100%;
    padding: 40px;
    justify-content: center;
    align-items: center;
`;

export const CustomButton = styled.TouchableOpacity`
    width: 100%;
    background-color: #fff
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    height: 60px;
`;
export const CustomButtonText = styled.Text`
    fontSize: 18px;
    color: #000000;
`;

export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 20px;
`;

export const SignMessageButtonText = styled.Text`
    font-size: 16px;
    color: #000000;
`;

export const SignMessageButtonTextBold = styled.Text`
    font-size: 16px;
    color: #000000;
    font-weight: bold;
    margin-left: 5px;
`;

