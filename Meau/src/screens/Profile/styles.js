import React from 'react';
import styled from 'styled-components/native';

/* VIEW */
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

`;

export const ViewArea = styled.View`
    width: 100%;
    padding: 20px;
`;

export const InputArea = styled.View`
    flex: 1;
    padding: 30px;
    align-items: center;
    justify-items: center;
    
`;

/* TEXT */

export const WelcomeSign = styled.Text`
    font-size: 20px;
    color: #000000;
    margin-top: 60px;
    height: 60px;
`;

export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #000000;
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

export const InputText = styled.Text`
    font-size: 16px;
    color: #000000;
    font-weight: bold;
    margin-bottom: 5px;
`;


/* BUTTON */

export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    width: 90%;
    background-color: #fff;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;  
    margin-bottom: 20px;
`;

export const ContentImg = styled.TouchableOpacity`
    flex: 1;
    border-radius: 100px;  
    margin-bottom: 20px;
    align-items: center;
    justify-content: center;
`;

/* IMAGE */

export const Avatar = styled.Image`
    width: 120px;
    height: 120px;
    border-radius: 100px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
    margin-bottom: 50px
`;