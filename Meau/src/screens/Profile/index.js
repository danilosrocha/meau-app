import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { auth, db, storage } from '../../../firebase'
import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  InputText,
  ScrollViewProfile,
} from './styles'
import SignInput from '../../components/SignInput'
import Galery from '../../components/Galery';

export default () => {

  const navigation = useNavigation();
  const idUser = auth.currentUser.uid;

  const [name, setNameField] = useState('');
  const [fone, setFoneField] = useState('');
  const [city, setCityField] = useState('');
  const [adress, setAdressField] = useState('');
  const [birth, setBirthField] = useState('');

  /*USER DATA*/

  const [data, setData] = useState([]);

  const getUsers = () => {
    db
      .collection("UserData")
      .get()
      .then((querySnapshot) => {
        let temporyData = []
        querySnapshot.forEach((doc) => {
          if (doc.id == idUser) {
            if (doc.data().nome == "") {
              // navigation.navigate("UpdateUserData")
              Alert.alert("Faltam dados para conta!") //Padronizar alerts
            } else {
              const user = {
                cidade: doc.data().cidade,
                dataNascimento: doc.data().dataNascimento,
                email: doc.data().email,
                endereco: doc.data().endereco,
                nome: doc.data().nome,
                telefone: doc.data().telefone,
              }
              setData(user)
            }
          }
        });
      });
  };

  useEffect(() => {
    getUsers();

  }, []);


  /*USER DATA*/
  const handleUpdateClick = () => {
    auth
    const colect = db.collection("UserData")
    const myDoc = colect.doc(auth.currentUser?.uid)

    const data = {
      "id": auth.currentUser?.uid,
      "email": auth.currentUser?.email,
      "nome": name,
      "telefone": fone,
      "cidade": city,
      "endereco": adress,
      "dataNascimento": birth
    }

    myDoc.set(data)
      .then(() => {
        Alert.alert("Informação", "Dados atualizado")
        navigation.navigate("RoutesTab")
      }).catch(error => alert(error.message))
  }

  return (
    <Container>
      <ScrollViewProfile>

        <InputArea>
          <Galery></Galery>

          <InputText>Nome</InputText>
          <SignInput
            placeholder={data.nome}
            value={name}
            onChangeText={t => setNameField(t)}
          />

          <InputText>Tefelone</InputText>
          <SignInput
            placeholder={data.telefone}
            value={fone}
            onChangeText={t => setFoneField(t)}
          />

          <InputText>Cidade</InputText>
          <SignInput
            placeholder={data.cidade}
            value={city}
            onChangeText={t => setCityField(t)}
          />

          <InputText>Endereço</InputText>
          <SignInput
            placeholder={data.endereco}
            value={adress}
            onChangeText={t => setAdressField(t)}
          />

          <InputText>Data de nascimento</InputText>
          <SignInput
            placeholder={data.dataNascimento}
            value={birth}
            onChangeText={t => setBirthField(t)}
          />

          <CustomButton onPress={handleUpdateClick}>
            <CustomButtonText>Salvar</CustomButtonText>
          </CustomButton>

        </InputArea>

      </ScrollViewProfile>
    </Container>
  );
}