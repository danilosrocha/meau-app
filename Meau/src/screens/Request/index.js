import React from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, db, storage } from "../../../firebase";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import HeaderBack from "../../components/HeaderBack";

import {
  Container,
  InputArea,
  ViewArea,
  ScrollViewPet,
  CustomButton,
  CustomButtonText,
  Input,
  SimpleTextBold,
  TitleTextBold,
  InputFields,
  InputField,
  CustomButtonPicture,
  PetPicture,
} from "./styles";

export default (object) => {
  const navigation = useNavigation();

  const idPet = object.route.params.idPet;
  const donoAtual = object.route.params.idRequestingUser;
  const idReq = object.route.params.idReq;
  console.log(">>>>>>> idPet", idPet)
  console.log(">>>>>>> Dono Atual: ", donoAtual)

  /*USER DATA*/

  const getNotifications = () => {
    const colectAdoptionRequests = db.collection("AdoptionRequests");
    const adoptionRequests = colectAdoptionRequests.doc(idPet);
    const requests = adoptionRequests.collection("Requests");
    const myDoc = requests.doc(idReq);
    const request = {
      request: false
    }
    myDoc
        .update(request)
        .then(() => {
          console.log(">>>>>> Request excluida");
        })
        .catch((error) => alert(error.message));

    // requests
    //   .get()
    //   .then((querySnapshot) => {
    //     let temporyData = [];
    //     querySnapshot.forEach((doc) => {
    //       if (doc.id == idReq)
    //       console.log("FILTREI SA PORRA COMN SUCESSO MANE");
    //       const request = {
    //         idPet: idPet,
    //         idRequestingUser: doc.data().idRequestingUser,
    //         title: doc.data().title,
    //         body: doc.data().body,
    //       };
    //       temporyData.push(request)
    //     });
    //   });

  };

  const handleAcceptClick = () => {
    auth;
    getNotifications();
    const colectHistory = db.collection("History");
    const adoptionHistory = colectHistory.doc(auth.currentUser?.uid);
    const colectPet = db.collection("Pet");
    const myPet = colectPet.doc(idPet);
    console.log("----> Eu sou o id do Pet", idPet)

    const historyData = {
      donoAntigo: auth.currentUser?.uid,
      donoAtual: donoAtual,
      id: idPet,
      statusAdocao: false,
    }

    const data = {
      donoId: donoAtual,
      id: idPet,
      statusAdocao: false,
    };

    myPet
      .update(data)
      .then(() => {
        adoptionHistory.set(historyData).then(() => {
          alert("O seu pet foi adotado!")
          navigation.navigate("Meus Pets")
        })
      })
      .catch((error) => alert(error.message));
  };

  const handleDeclineClick = () => {
    getNotifications();
    navigation.goBack()
  }

  return (
    <Container>
      <HeaderBack
        title={"Requisição"}
      />

      <ScrollViewPet>
        <InputArea>

          <CustomButton onPress={() => handleAcceptClick()}>
            <CustomButtonText>Autorizar requisição de adoção</CustomButtonText>
          </CustomButton>

          <CustomButton onPress={() => handleDeclineClick()}>
            <CustomButtonText>Negar requisição de adoção</CustomButtonText>
          </CustomButton>

        </InputArea>
      </ScrollViewPet>
    </Container>
  );
};