import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Preload from "../screens/Preload";
import SignIn from "../screens/SignIn";
import SignUp_1 from "../screens/SignUp/index_1";
import SignUp_2 from "../screens/SignUp/index_2";
import PetProfile from "../screens/PetProfile";
import AdoptPet from "../screens/AdoptPet";
import NotificationInbox from "../screens/NotificationInbox";
import Request from "../screens/Request";
import MainTab from "./MainTab";

const Stack = createStackNavigator();

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
      <Stack.Screen name="RoutesTab" component={MainTab} />

    </Stack.Group>

    <Stack.Group
      screenOptions={{
        headerShown: true,
        unmountOnBlur: true,
      }}
    >
      <Stack.Screen name="Adotar Pet" component={AdoptPet} />
      <Stack.Screen name="Perfil Pet" component={PetProfile} />
      <Stack.Screen name="Solicitações de adoção" component={NotificationInbox} />
      <Stack.Screen name="Requisição" component={Request} />
      
    </Stack.Group>

  </Stack.Navigator>
);


