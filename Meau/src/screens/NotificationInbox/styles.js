import React from 'react';
import styled from 'styled-components/native';

/* VIEW */

export const Container = styled.SafeAreaView`
    background-color: #58BD97;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const ViewArea = styled.View`
    width: 100%;
    height: 60%;
    flex:1;
    justify-content: center;
    align-items: center;
    

`;

export const FlatList = styled.FlatList`
    border-radius: 30px;
    margin-bottom: 20px;
    width: 100%;
    height: 80%;
    
`;

/* TEXT */

export const SimpleText = styled.Text`
    font-size: 20px;
    color: #000000;
    margin-top: 60px;
    height: 60px;
    text-align: center;    
`;

export const TitleText = styled.Text`
    font-size: 22px;
    color: #000000;
    margin-top: 60px;
    height: 60px;
    text-align: center;    
    font-weight: bold;
`;

export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #000000;
    
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

/* BUTTOM */

export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    width: 85%;
    background-color: #fff;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 20px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    flex: 1;
    margin-top: 50px;
    margin-bottom: 50px
`;









