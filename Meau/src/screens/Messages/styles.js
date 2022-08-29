import React from "react";
import styled from "styled-components/native";

/* VIEW */
export const Container = styled.SafeAreaView`
  background-color: #58bd97;
  width: 100%;
  flex: 1;
`;

export const ScrollViewPet = styled.ScrollView`
  width: 100%;
  height: 100%;
  flex: 1;
`;

export const FlatList = styled.FlatList`
    border-radius: 30px;
    margin-bottom: 20px;
    width: 100%;
    height: 80%;
    
`;

export const InputArea = styled.View`
  flex:1 ;

`;

export const InputFields = styled.View`
  width: 100%;
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  
`;

export const InputField = styled.View`
  width: 100%;
  flex: 1;
  justify-content: center;
  padding: 8px;
  margin: 5px;
  border-radius: 20px;
  background-color: #4444;
  
`;

export const ViewArea = styled.View`
  width: 100%;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: 20px;
  margin-left: 9px;
  text-align: left;
  font-weight: bold;
`;

/* TEXT */

export const SimpleText = styled.Text`
  font-size: 20px;
  color: #000000;
  margin-top: 20px;
`;

export const SimpleTextBold = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  margin-bottom: auto;
`;

export const TitleTextBold = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;

export const WelcomeSign = styled.Text`
  font-size: 24px;
  color: #000000;
  margin-top: 60px;
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

/* BUTTON */

export const CustomButton = styled.TouchableOpacity`
  width: 100%;
  background-color: #fff;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  height: 60px;
  margin-bottom: 20px;
`;

export const MessageButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 20px;
`;

export const CustomButtonPicture = styled.TouchableOpacity`
  height: 200px;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

/* IMAGE */

export const PetPicture = styled.Image`
  width: 100%;
  height: 100%;
`;

