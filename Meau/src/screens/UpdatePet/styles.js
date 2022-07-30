import React from 'react';
import styled from 'styled-components/native';

/* VIEW */
export const Container = styled.SafeAreaView`
    background-color: #58BD97;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export const ScrollViewPet = styled.ScrollView`
    width: 100%;
    height: 100%;
    flex: 1;
    padding: 30px;
`;

/* TEXT */
export const SimpleText = styled.Text`
    font-size: 20px;
    color: #000000;
    margin-top: 20px;
`;

export const WelcomeSign = styled.Text`
    font-size: 24px;
    color: #000000;
    margin-top: 60px;
`;

export const InputArea = styled.View`
    width: 100%;
    padding: 40px;
    justify-content: center;
    align-items: center;
`;

/* BUTTON */
export const ViewArea = styled.View`
    width: 100%;
    padding: 10px;
    justify-content: center;
    align-items: center;
`;



export const CustomButton = styled.TouchableOpacity`
    width: 100%;
    background-color: #fff;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    height: 60px;
    margin-bottom: 20px;
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


