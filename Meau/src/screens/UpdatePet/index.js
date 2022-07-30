import React, { useState } from 'react'
import { Text, StyleSheet } from 'react-native'
import {
  Container,
  SimpleText,
  InputArea,
  CustomButton,
  CustomButtonText,
  ViewArea,
  ScrollViewPet,

} from './styles'

import SignInput from '../../components/SignInput'
import { useNavigation } from '@react-navigation/native'
import { doc, setDoc } from "firebase/firestore"
import { auth } from '../../../firebase'
import { db } from '../../../firebase'
import { Picker } from '@react-native-picker/picker'

export default () => {


  const navigation = useNavigation();

  const [name, setNameField] = useState();
  const [sex, setSexField] = useState("Macho");
  const [specie, setSpecieField] = useState("Cachorro");
  const [size, setSizeField] = useState("Pequeno");
  const [age, setAgeField] = useState("Filhote");

  const handleUpdateClick = () => {
    auth
    const colect = db.collection("Pet")
    const myDoc = colect.doc()

    const data = {
      "DonoId": auth.currentUser?.uid,
      "nome": name,
      "sexo": sex,
      "especie": specie,
      "porte": size,
      "idade": age
    }
    myDoc.set(data)
      .then(() => {
        alert("Lista de Animais atualizada com sucesso!")
        navigation.navigate("Home")
      }).catch(error => alert(error.message))
  }

  const handleRegisterClick = () => {
    auth
    navigation.navigate("Home")
  }
  const Cancel = () => {
    auth
    navigation.navigate("Home")
  }
  return (
    <Container>

      <ScrollViewPet>
        <ViewArea>

          <SimpleText>Adicione os dados do pet</SimpleText>

          <InputArea>

            <SignInput
              placeholder="Nome do pet"
              value={name}
              onChangeText={t => setNameField(t)}
            />

            <Text>selecione o sexo do animal</Text>
            <Picker
              style={{ height: 50, width: 150 }}
              selectedValue={sex}
              onValueChange={(itemValue, itemIndex) =>
                setSexField(itemValue)}
            >
              <Picker.Item label="Macho" value="Macho" />
              <Picker.Item label="Femea" value="Femea" />
            </Picker>

            <Text>selecione a especie do animal</Text>
            <Picker
              style={{ height: 50, width: 200 }}
              selectedValue={specie}
              onValueChange={(itemValue, itemIndex) =>
                setSpecieField(itemValue)}
            >
              <Picker.Item label="Cachorro" value="Cachorro" />
              <Picker.Item label="Gato" value="Gato" />
            </Picker>

            <Text>selecione o porte do animal</Text>
            <Picker
              style={{ height: 50, width: 200 }}
              selectedValue={size}
              onValueChange={(itemValue, itemIndex) =>
                setSizeField(itemValue)}
            >
              <Picker.Item label="Pequeno" value="Pequeno" />
              <Picker.Item label="Médio" value="Médio" />
              <Picker.Item label="Grande" value="Grande" />
            </Picker>

            <Text>selecione a idade do animal</Text>
            <Picker
              style={{ height: 50, width: 200 }}
              selectedValue={age}
              onValueChange={(itemValue, itemIndex) =>
                setAgeField(itemValue)}
            >
              <Picker.Item label="Filhote" value="Filhote" />
              <Picker.Item label="Adulto" value="Adulto" />
              <Picker.Item label="Idoso" value="Idoso" />
            </Picker>


            <CustomButton onPress={handleUpdateClick}>
              <CustomButtonText>Cadastrar pet</CustomButtonText>
            </CustomButton>
            <CustomButton onPress={Cancel}>
              <CustomButtonText>Cancelar</CustomButtonText>
            </CustomButton>

          </InputArea>

        </ViewArea>

      </ScrollViewPet>

    </Container>
  );
}
