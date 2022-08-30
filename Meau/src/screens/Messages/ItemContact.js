import React, { useState, useLayoutEffect } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from '../../../firebase'

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
const IconLoading = styled.ActivityIndicator`
`;

export default ({ item }) => {

  const navigation = useNavigation();
  const idUser = auth.currentUser.uid
  const idD = idUser + item.id

  const collectionMessages = db.collection("Chats")
  const chatIDD = collectionMessages.doc(idD)
  const messagesChatD = chatIDD.collection("Messages")

  const [lastObject, setLastObject] = useState([]);

  const handleChatClick = (idUser, userName) => {
    navigation.navigate('Chat', {
      idUser: idUser,
      userName: userName,
    });
  }

  useLayoutEffect(() => {

    const unsubscribe = messagesChatD
      .orderBy("createdAt", "desc")
      .onSnapshot(snapshot =>
        setLastObject(snapshot.docs.map(doc =>
        ({
          createdAt: doc.data().createdAt.toDate().toDateString(),
          text: doc.data().text,
        })
        )))
    return unsubscribe;

  }, [])
  
  const last = lastObject[0]

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
              {! last ? (<IconLoading size="small" color="black"/>) : (<PostTime>{last.createdAt}</PostTime>)}
            </UserInfoText>
            {! last ? (<IconLoading size="small" color="black"/>) : (<MessageText>{last.text}</MessageText>)}
          </TextSection>
        </UserInfo>
      </Card>
    </Container>

  );
};
