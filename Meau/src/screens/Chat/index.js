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
  const temporyData = []

  const collectionMessages = db.collection("Chats")

  const [data, setData] = useState()

  useLayoutEffect(() => {
    // collectionMessages
    //   .get()
    //   .then((snapshot) => snapshot.forEach((doc) => {
    //     if (idUser == doc.data().idUser && idUserRecive == doc.data().idUserRecive) {
    //       // const docMessages = db.collection("Chats").doc(doc._delegate._key.path.segments[6]);
    //       console.log("--------------------------------------------------------------------------------------------");
    //       console.log(">>>>>>>>>>>> ID MENSSAGE", doc.data()._id);
    //       console.log(">>>>>>>>>>>> ID", doc._delegate._key.path.segments[6]);
    //       // console.log(">>>>>>>>>>>> DOC", doc.data());
    //       console.log("--------------------------------------------------------------------------------------------");
    //       temporyData.push(doc._delegate._key.path.segments[6])
    //       // const docs = collectionMessages.doc(doc._delegate._key.path.segments[6])
    //       const unsubscribe = collectionMessages
    //         .orderBy("createdAt", "desc")
    //         .onSnapshot(snapshot => snapshot.docs.map(doc => {
    //           if (idUser == doc.data().idUser && idUserRecive == doc.data().idUserRecive) {
    //             console.log(
    //               ({
    //                 _id: doc.data()._id,
    //                 createdAt: doc.data().createdAt.toDate(),
    //                 text: doc.data().text,
    //                 user: doc.data().user
    //               })
    //             );
    //           }
    //         }
    //         ))

    //       //console.log(unsubscribe);
    //     }

    // setMessages(
    //   ({
    //     _id: doc.data()._id,
    //     createdAt: doc.data().createdAt.toDate(),
    //     text: doc.data().text,
    //     user: doc.data().user
    //   }))
    // // return unsubscribe;
    // console.log(temporyData);
    // setData(temporyData)
    // }))



    /*
  
    idClicando
  
    array = [chat1, chat2]
  
    chat = array.filter(chat => chat.id == idclicando)
  
    */
    // const unsubscribe = collectionMessages
    //   // .get(data) 
    //   .orderBy("createdAt", "desc")
    //   .onSnapshot((snapshot) => snapshot.forEach((doc) => {
    //     if (idUser == doc.data().idUser && idUserRecive == doc.data().idUserRecive) {
    //       const collectionMessages = db.collection("Chats").doc(doc._delegate._key.path.segments[6]);
    //       console.log(">>>>>>>>>>>>>> ENTREI NO IF:", doc.data()._id);
    //       // doc._delegate._key.path.segments[6]
    //       const id = doc.data()._id
    //       setMessages(snapshot.docs.map(doc =>
    //       ({
    //         _id: doc.data()._id,
    //         createdAt: doc.data().createdAt.toDate(),
    //         text: doc.data().text,
    //         user: doc.data().user
    //       })))

    //       temporyData.push(id)
    //     }
    //     setData(temporyData)
    //   }))
    // return unsubscribe;
    const unsubscribe = collectionMessages
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


    // const unsubscribe = collectionMessages
    // "FtiPAA88LzTDNEY7DaxwN7kEeIO2"
    //   .orderBy("createdAt", "desc")
    //   .onSnapshot(snapshot => (snapshot.docs.map(doc => {
    //     console.log(">>>>>>>>>>>>> idUser", doc.data().idUser);
    //     console.log(">>>>>>>>>>>>> idUserRecive", doc.data().idUserRecive);
    //     if (idUser == doc.data().idUser && idUserRecive == doc.data().idUserRecive) {

    //         const id = ({
    //           _id: doc.data()._id,
    //           idUser: doc.data().idUser,
    //           idUserRecive: doc.data().idUserRecive,
    //           createdAt: doc.data().createdAt.toDate(),
    //           text: doc.data().text,
    //           user: doc.data().user
    //         })
    //         temporyData.push(id)
    //     }
    //     console.log(temporyData);
    //   }

    //   )))
    //   setMessages(temporyData)
    // return unsubscribe

  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const {
      _id,
      text,
      createdAt,
      user
    } = messages[0]
    collectionMessages.add({
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

