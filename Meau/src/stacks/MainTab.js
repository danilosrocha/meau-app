import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CustomTabBar from "../components/CustomTabBar.js";

import Home from "../screens/Home";
import Profile from "../screens/Profile";
import RegisterPet from "../screens/RegisterPet";
import MyPets from "../screens/MyPets";
import Config from "../screens/Config";

const Tab = createBottomTabNavigator();

export default () => {
    return (
        <Tab.Navigator
            tabBar={props => <CustomTabBar {...props} />}
            initialRouteName="Inicio"
            screenOptions={{
                headerShown: false,
                unmountOnBlur: true,
            }}
        >
            <Tab.Screen name="Perfil" component={Profile} />
            <Tab.Screen name="Meus Pets" component={MyPets} />
            <Tab.Screen name="Inicio" component={Home} />
            <Tab.Screen name="Cadastrar Pet" component={RegisterPet} />
            <Tab.Screen name="Configurações" component={Config} />
        </Tab.Navigator>)

}
