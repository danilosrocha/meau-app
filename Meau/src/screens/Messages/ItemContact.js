import React, { Component } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  background-color: transparent;
`;

const Card = styled.TouchableOpacity`
  width: 100%;
`;

const UserInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const UserImgWrapper = styled.View`
  padding-top: 15px;
  padding-bottom: 15px;
`;

const UserImg = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  aspect-ratio: 1;
`;

const TextSection = styled.View`
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  padding-left: 0;
  margin-left: 10px;
  width: 300px;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
`;

const UserInfoText = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const UserName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const PostTime = styled.Text`
  font-size: 12px;
  margin-bottom: 5px;
`;

const MessageText = styled.Text`
  font-size: 12px;
  margin-bottom: 5px;
`;



export default ({ item }) => {

  const navigation = useNavigation();

  const handleChatClick = (idUser, userName) => {
    navigation.navigate('Chat', {
      idUser: idUser,
      userName: userName,
    });
  }

  return (
    <Container>
      <Card onPress={() => handleChatClick(item.id, item.nome)}>
        <UserInfo>
          <UserImgWrapper>
            <UserImg source={{ uri: item.fotoUsuario }} />
          </UserImgWrapper>
          <TextSection>
            <UserInfoText>
              <UserName>{item.nome}</UserName>
              <PostTime>{item.messageTime}</PostTime>
            </UserInfoText>
            <MessageText>{item.messageText}</MessageText>
          </TextSection>
        </UserInfo>
      </Card>
    </Container>

  );
};
