import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import HeaderBack from "../../components/HeaderBack";
import { auth, db } from '../../../firebase'

import {
  Container,
  InputArea,
  ScrollViewPet,
} from "./styles";

export default () => {

  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ])
  // }, [])

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection('Chats')
      .orderBy("createdAt", "desc")
      .onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user
      }))
      ))
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
    db.collection('Chats').add({
      _id,
      text,
      createdAt,
      user
    })
  }, [])

  return (
    <Container>
      <HeaderBack
        title={"Inicie uma conversa"}
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

