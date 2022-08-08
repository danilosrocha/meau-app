import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Preload from "../screens/Preload";
import SignIn from "../screens/SignIn";
import SignUp_1 from "../screens/SignUp/index_1";
import SignUp_2 from "../screens/SignUp/index_2";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import RegisterPet from "../screens/RegisterPet";
import MyPets from "../screens/MyPets";
import Config from "../screens/Config";
import PetProfile from "../screens/PetProfile";
import AdoptPet from "../screens/AdoptPet";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function RoutesTab() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerShown: true,
        unmountOnBlur: true,
        headerTitleAlign: "center",
      }}
    >
      <Tab.Screen name="Perfil" component={Profile} />
      <Tab.Screen name="Meus Pets" component={MyPets} />
      <Tab.Screen name="Inicio" component={Home} />
      <Tab.Screen name="Cadastrar Pet" component={RegisterPet} />
      <Tab.Screen name="Configurações" component={Config} />
    </Tab.Navigator>
  );
}

export default () => (
  <Stack.Navigator initialRouteName="Preload">
    <Stack.Group
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
      }}
    >
      <Stack.Screen name="Preload" component={Preload} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp_1" component={SignUp_1} />
      <Stack.Screen name="SignUp_2" component={SignUp_2} />
      <Stack.Screen name="RoutesTab" component={RoutesTab} />
      
    </Stack.Group>

    <Stack.Group
      screenOptions={{
        headerShown: true,
        unmountOnBlur: true,
      }}
    >
      <Stack.Screen name="Adotar Pet" component={AdoptPet} />
      <Stack.Screen name="Perfil Pet" component={PetProfile} />
      <Tab.Screen name="Profile" component={RoutesTab} />
      
    </Stack.Group>
  </Stack.Navigator>
);
