import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../../firebase";
import "react-native-get-random-values";
import Notification from '../../Services/Notification'
import HeaderBack from "../../components/HeaderBack"

import {
  Container,
  InputArea,
  ScrollViewPet,
  CustomButton,
  CustomButtonText,

  TitleTextBold,
  CustomButtonAdoption
} from "./styles";

export default (object) => {

  const navigation = useNavigation();

  const [name, setNameField] = useState("");
  const [sex, setSexField] = useState("");
  const [specie, setSpecieField] = useState("");
  const [size, setSizeField] = useState("");
  const [age, setAgeField] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("");
  const [petAvatar, setPetAvatar] = useState("");
  const [fileName, setFileName] = useState("");
  const [currentOwner, setCurrentOwner] = useState("");
  const [petProfilePicture, setPetProfilePicture] = useState("");
  const [data, setData] = useState([]);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [ownerName, setOwnerName] = useState("");

  const requestingUser = auth.currentUser?.email
  const idRequestingUser = auth.currentUser?.uid
  const idPet = object.route.params.idPet;

  const getPets = async () => {
    db.collection("Pet")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().id == idPet) {
            const pet = {
              donoId: doc.data().donoId,
              nome: doc.data().nome,
              sexo: doc.data().sexo,
              especie: doc.data().especie,
              porte: doc.data().porte,
              idade: doc.data().idade,
              fotoPet: doc.data().fotoPet,
              id: doc.data().id,
              fileNamePicture: doc.data().fileNamePicture,
              statusAdocao: doc.data().statusAdocao,
            };
            setCurrentOwner(pet.donoId);
            setNameField(pet.nome);
            setSexField(pet.sexo);
            setSpecieField(pet.especie);
            setSizeField(pet.porte);
            setAdoptionStatus(pet.statusAdocao);
            setAgeField(pet.idade);
            setFileName(pet.fileNamePicture);
            setPetProfilePicture(pet.fotoPet);
            setData(pet);
            getOwnerToken(pet.donoId);      
          }
        });
      });
      
  };

  const getOwnerToken = async (donoId) => {
    await db.collection("UserData")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.data().id);
          if (doc.data().id == donoId) {
            setExpoPushToken(doc.data().expoPushToken);
            setOwnerName(doc.data().nome);
          };
        });
      });
  }

  /*USER DATA*/
<<<<<<< HEAD
=======
  const handleAdoptClick = (idPet,namePet, currentOwner) => {
    auth;
    const colectHistory = db.collection("PedidosAdocao");
    const adoptionHistory = colectHistory.doc();
    const historyData = {
        Solicitante: auth.currentUser?.uid,
        SolicitanteEmail:auth.currentUser?.email,
        Dono: currentOwner,
        id: idPet,
        petName: namePet,
        statusAdocao: false,
    }


    adoptionHistory
        .set(historyData).then(() => {
            Alert.alert("Informação", "Pedido de adoção enviado");
            navigation.navigate('Meus Pets')
        }).catch((error) => alert(error.message));
  };
>>>>>>> Lucas

  useEffect(() => {
    getPets();
  }, []);

  return (
    <Container>
      <HeaderBack 
      title={data.nome}
      />
      <ScrollViewPet>
        <InputArea>
          <TitleTextBold>Vamos adotar o pet?</TitleTextBold>

          <CustomButtonAdoption>
            <CustomButtonText>{data.nome}</CustomButtonText>
          </CustomButtonAdoption>
          <CustomButtonAdoption>
            <CustomButtonText>{data.especie}</CustomButtonText>
          </CustomButtonAdoption>
          <CustomButtonAdoption>
            <CustomButtonText>{data.sexo}</CustomButtonText>
          </CustomButtonAdoption>
          <CustomButtonAdoption>
            <CustomButtonText>{data.idade}</CustomButtonText>
          </CustomButtonAdoption>
          <CustomButtonAdoption>
            <CustomButtonText>{data.porte}</CustomButtonText>
          </CustomButtonAdoption>
<<<<<<< HEAD
          <Notification
          expoPushTokenOwner={expoPushToken}
          ownerName={ownerName}
          idRequestingUser={idRequestingUser}
          requestingUser={requestingUser}
          name={name}
          idPet={idPet}
          > 
          </Notification>
=======
          <CustomButton onPress={() => handleAdoptClick(idPet,data.nome, currentOwner)}>
            <CustomButtonText>Adotar pet</CustomButtonText>
          </CustomButton>
>>>>>>> Lucas
        </InputArea>
      </ScrollViewPet>
    </Container>
  );
};

{
  /* <SimpleTextBold>Selecione o sexo do animal</SimpleTextBold>
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
  onValueChange={(itemValue, itemIndex) =>
    setAdoptionStatus(itemValue)
  }
>
  <Picker.Item label="True" value={true} />
  <Picker.Item label="False" value={false} />
</Picker> */
}
