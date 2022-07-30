import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #58BD97;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const ScrollViewProfile = styled.ScrollView`
    width: 100%;
    height: 100%;
    flex: 1;
    padding: 30px;
`;

export const WelcomeSign = styled.Text`
    font-size: 20px;
    color: #000000;
    margin-top: 60px;
    height: 60px;
`;

export const ViewArea = styled.View`
    width: 100%;
    padding: 20px;
`;

export const InputArea = styled.View`
    width: 100%;
    padding: 40px;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    background-color: #fff;
    margin-left: 25px;
    margin-right: 25px;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #000000;
`;

export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    
    margin-bottom: 20px;
`;

export const SignMessageButtonText = styled.Text`
    font-size: 16px;
    color: #000000;
    text-align: center;
`;

export const SignMessageButtonTextBold = styled.Text`
    font-size: 16px;
    color: #000000;
    font-weight: bold;
    margin-left: 5px;
`;

export const ContentImg = styled.TouchableOpacity`
    align-items: center;
    justify-items: center;
    height: 100px;    
`;

export const Avatar = styled.Image`
    width: 120px;
    height: 120px;
    border-radius: 100px;
    
`;

