import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #58BD97;
    flex: 1;
`;

export const WelcomeSign = styled.Text`
    font-size: 24px;
    color: #000000;
    margin-top: 60px;
    height: 60px;
`;

export const AreaButtons = styled.View`
    width: 100%;
    flex: 1;
    padding-top: 60px;
`;

export const BarArea = styled.View`
    height: 100%;
    width: 20%;
    background-color: red;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    width: 90%;
    background-color: #fff;
    border-radius: 30px;
    justify-content: center;
    align-items: center;

`;
export const CustomButtonText = styled.Text`
    font-size: 18px;
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

export const ContentImg = styled.TouchableOpacity`
    width: 100%;
    height: 100%;
    align-items: center;
    justify-items: center;
`;

export const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 100px;
    margin-bottom: 20px;
`;
