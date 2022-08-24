import React, { useEffect, useState } from "react";
import {
  Container,
  ViewArea,
  CustomButton,
  CustomButtonText,
  FlatList,
  TitleText,
  LoadingIcon,
} from "./styles";

import { useNavigation } from "@react-navigation/native";

import { auth, db } from "../../../firebase";

import ItemRequest from "./ItemRequest";
import ItemEmpty from "./ItemEmpty";
import HeaderBack from "../../components/HeaderBack";

export default (object) => {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const idPet = object.route.params.idPet;

  const handleGoBack = () => {
    auth;
    navigation.goBack();
  };

  const getNotifications = () => {
    console.log(`>>>>>>>>>> IdPet Notification: ${idPet}`);
    const colectAdoptionRequests = db.collection("AdoptionRequests");
    const adoptionRequests = colectAdoptionRequests.doc(idPet);
    const requests = adoptionRequests.collection("Requests");

    requests
      .get()
      .then((querySnapshot) => {
        let temporyData = [];
        querySnapshot.forEach((doc) => {
          const request = {
            idPet: idPet,
            idRequestingUser: doc.data().idRequestingUser,
            title: doc.data().title,
            body: doc.data().body,
          };
          temporyData.push(request)
        });
        setData(temporyData);
      });
  };

  const renderItem = ({ item }) => <ItemRequest item={item} />;
  const renderEmpty = () => <ItemEmpty />;

  useEffect(() => {
    getNotifications()
  }, []);


  return (
    <Container>
      <HeaderBack 
      title={"Requisições de adoção"}
      />
      <ViewArea>
        {data
          ? <FlatList
            data={data}
            renderItem={renderItem}
            ListEmptyComponent={renderEmpty}
          />
          : <LoadingIcon size="large" color="#ffffff" />
        }

        <CustomButton onPress={handleGoBack}>
          <CustomButtonText>Voltar ao perfil do Pet</CustomButtonText>
        </CustomButton>
      </ViewArea>
    </Container>
  );
};
