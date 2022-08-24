import React, { useEffect, useState } from "react";
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

export default () => {
  const navigation = useNavigation();

  // const idPet = object.route.params.idPet;
  // const donoAtual = object.route.params.idRequestingUser;
  // console.log(">>>>>>> idPet", idPet)
  // console.log(">>>>>>> Dono Atual: ", donoAtual)
  // console.log(">>>>>>> Dono Atual: ", object)

  /*USER DATA*/

  // const handleAcceptClick = () => {
  //   auth;
  //   const colectHistory = db.collection("History");
  //   const adoptionHistory = colectHistory.doc(auth.currentUser?.uid);
  //   const colectPet = db.collection("Pet");
  //   const myPet = colectPet.doc(idPet);
  //   console.log("----> Eu sou o id do Pet", idPet)
    
  //   const historyData = {
  //     donoAntigo: auth.currentUser?.uid,
  //     donoAtual: donoAtual,
  //     id: idPet,
  //     statusAdocao: false,
  //   }

  //   const data = {
  //     donoId: donoAtual,
  //     id: idPet,
  //     statusAdocao: false,
  //   };

  //   myPet
  //     .update(data)
  //     .then(() => {
  //       adoptionHistory.set(historyData).then(() => {
  //         navigation.navigate("Meus Pets")
  //       })
  //     })
  //     .catch((error) => alert(error.message));
  // };

  return (
    <Container>
      <HeaderBack
      title={"Inicie uma conversa"}
      />
      <ScrollViewPet>
        <InputArea>

          {/* <CustomButton onPress={() => handleAcceptClick()}>
            <CustomButtonText></CustomButtonText>
          </CustomButton> */}

        </InputArea>
      </ScrollViewPet>
    </Container>
  );
};


/*<Container>
    <ScrollViewPet>
      <InputArea>
        <TitleTextBold>Adicione os dados do pet</TitleTextBold>

        <SignInput
          placeholder="Nome"
          value={name}
          onChangeText={(t) => setNameField(t)}
        />

        <CustomButtonPicture onPress={handlePictureResgister}>
          <CustomButtonText>Cadastrar Fotos</CustomButtonText>
        </CustomButtonPicture>

        <SimpleTextBold>Selecione o sexo do animal</SimpleTextBold>
        <Picker
          style={{ height: 50, width: 150 }}
          selectedValue={sex}
          onValueChange={(itemValue, itemIndex) => setSexField(itemValue)}
        >
          <Picker.Item label="Macho" value="Macho" />
          <Picker.Item label="Femea" value="Femea" />
        </Picker>

        <SimpleTextBold>Selecione a especie do animal</SimpleTextBold>
        <Picker
          style={{ height: 50, width: 200 }}
          selectedValue={specie}
          onValueChange={(itemValue, itemIndex) => setSpecieField(itemValue)}
        >
          <Picker.Item label="Cachorro" value="Cachorro" />
          <Picker.Item label="Gato" value="Gato" />
        </Picker>

        <SimpleTextBold>Selecione o porte do animal</SimpleTextBold>
        <Picker
          style={{ height: 50, width: 200 }}
          selectedValue={size}
          onValueChange={(itemValue, itemIndex) => setSizeField(itemValue)}
        >
          <Picker.Item label="Pequeno" value="Pequeno" />
          <Picker.Item label="Médio" value="Médio" />
          <Picker.Item label="Grande" value="Grande" />
        </Picker>

        <SimpleTextBold>Selecione a idade do animal</SimpleTextBold>
        <Picker
          style={{ height: 50, width: 200 }}
          selectedValue={age}
          onValueChange={(itemValue, itemIndex) => setAgeField(itemValue)}
        >
          <Picker.Item label="Filhote" value="Filhote" />
          <Picker.Item label="Adulto" value="Adulto" />
          <Picker.Item label="Idoso" value="Idoso" />
        </Picker>

        <SimpleTextBold>Animal para adoção?</SimpleTextBold>
        <Picker
          selectedValue={adoptionStatus}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setAdoptionStatus(itemValue)}
        >
          <Picker.Item label="True" value={true} />
          <Picker.Item label="False" value={false} />
        </Picker>

        <CustomButton onPress={handleRegisterClick}>
          <CustomButtonText>Cadastrar pet</CustomButtonText>
        </CustomButton>

        <CustomButton onPress={handleCancelClick}>
          <CustomButtonText>Cancelar</CustomButtonText>
        </CustomButton>
      </InputArea>
    </ScrollViewPet>
  </Container> */

