import React from "react";
import styled from "styled-components/native";

/* VIEW */
export const Container = styled.SafeAreaView`
  background-color: #58bd97;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const ScrollViewPet = styled.ScrollView`
  width: 100%;
  height: 100%;
  flex: 1;
  padding: 15px;
`;

export const InputArea = styled.View`
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ViewArea = styled.View`
  width: 100%;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

/* TEXT */

export const SimpleText = styled.Text`
  font-size: 20px;
  color: #000000;
  margin-top: 20px;
`;

export const SimpleTextBold = styled.Text`
  font-size: 20px;
  color: #000000;
  margin-top: 20px;
  font-weight: bold;
`;

export const TitleTextBold = styled.Text`
  font-size: 22px;
  color: #000000;
  margin-top: 20px;
  margin-bottom: 20px;
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
  height: 100px;
  width: 90%;
  border-radius: 10px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

/* IMAGE */

export const PetPicture = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 100px;
`;
