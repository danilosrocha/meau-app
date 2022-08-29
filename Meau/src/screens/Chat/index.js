import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import HeaderBack from "../../components/HeaderBack";
import { auth, db } from '../../../firebase'

import {
  Container,
  InputArea,
  ScrollViewPet,
} from "./styles";

export default (object) => {

  const [messages, setMessages] = useState([]);

  const nameId = object.route.params.userName;
  const idUserRecive = object.route.params.idUser;
  const idUser = auth.currentUser.uid

  const idI = idUserRecive + idUser
  const idD = idUser + idUserRecive

  const temporyData = []
  const [data, setData] = useState()

  const collectionMessages = db.collection("Chats")
  const chatIDI = collectionMessages.doc(idI)
  const chatIDD = collectionMessages.doc(idD)
  const messagesChatI = chatIDI.collection("Messages")
  const messagesChatD = chatIDD.collection("Messages")

  useLayoutEffect(() => {



    collectionMessages
      .get()
      .then((snapshot) => snapshot.forEach((doc) => {
        if (idI == doc.id || idD == doc.id) {
          console.log(">>>>>>>>>>>> DOC", doc.id);
        }
      }))


    const unsubscribe = messagesChatI
      .orderBy("createdAt", "desc")
      .onSnapshot(snapshot =>
        setMessages(snapshot.docs.map(doc =>
        ({
          _id: doc.data()._id,
          idUser: doc.data().idUser,
          idUserRecive: doc.data().idUserRecive,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        })
        )))
    return unsubscribe;

  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const {
      _id,
      text,
      createdAt,
      user
    } = messages[0]
    messagesChatI.add({
      _id,
      idUser,
      idUserRecive,
      text,
      createdAt,
      user
    })
    messagesChatD.add({
      _id,
      idUser,
      idUserRecive,
      text,
      createdAt,
      user
    })
  }, [])

  return (
    <Container>
      <HeaderBack
        title={nameId}
      />
      <InputArea>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: auth?.currentUser?.email,
            name: auth?.currentUser?.displayName,
            avatar: auth?.currentUser?.photoURL
          }}
        />
      </InputArea>
    </Container>
  );
};

