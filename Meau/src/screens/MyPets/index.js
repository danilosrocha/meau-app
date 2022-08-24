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

import ItemPets from "./ItemPets";
import ItemEmpty from "./ItemEmpty";
import Header from "../../components/Header";

export default () => {
  const navigation = useNavigation();

  const handleUpdatePet = () => {
    auth;
    navigation.navigate("Cadastrar Pet");
  };

  const idUser = auth.currentUser?.uid;
  const [data, setData] = useState();

  const getPets = () => {
    db.collection("Pet")
      .get()
      .then((querySnapshot) => {
        let temporyData = [];
        querySnapshot.forEach((doc) => {
          if (idUser == doc.data().donoId) {
            const Pet = {
              sexo: doc.data().sexo,
              idade: doc.data().idade,
              porte: doc.data().porte,
              especie: doc.data().especie,
              nome: doc.data().nome,
              id: doc.data().id,
              donoId: doc.data().donoId,
              fotoPet: doc.data().fotoPet,
            };
            temporyData.push(Pet);
          }
        });
        setData(temporyData);
      });
  };

  const renderItem = ({ item }) => <ItemPets item={item} />;
  const renderEmpty = () => <ItemEmpty />;

  useEffect(() => {
    getPets()
  }, []);

  return (
    <Container>
      <Header
        title={"Meus animais"}
      />
      <ViewArea>
        {data
          ? <FlatList
            data={data}
            renderItem={renderItem}
            ListEmptyComponent={renderEmpty}
            contentContainerStyle={{ marginHorizontal: 10 }}
          />
          : <LoadingIcon size="large" color="#ffffff" />
        }

        <CustomButton onPress={handleUpdatePet}>
          <CustomButtonText>Adicionar pet</CustomButtonText>
        </CustomButton>
      </ViewArea>
    </Container>
  );
};
