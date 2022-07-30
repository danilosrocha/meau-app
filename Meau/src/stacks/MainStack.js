import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Preload from '../screens/Preload';
import SignIn from '../screens/SignIn';
import SignUp_1 from '../screens/SignUp/index_1';
import SignUp_2 from '../screens/SignUp/index_2';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import UpdatePet from '../screens/UpdatePet';
import MyPets from '../screens/MyPets';
import Config from '../screens/Config';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()

function RoutesTab() {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: true,
                unmountOnBlur: true
            }}
        >
            <Tab.Screen name="Meu Perfil" component={Profile} />
            <Tab.Screen name="MyPets" component={MyPets} />
            <Tab.Screen name="Inicio" component={Home} />
            <Tab.Screen name="UpdatePet" component={UpdatePet} />
            <Tab.Screen name='Config' component={Config} />
        </Tab.Navigator>
    )
}

export default () => (

    <Stack.Navigator
        initialRouteName='Preload'
    >
        <Stack.Group
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Preload" component={Preload} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp_1" component={SignUp_1} />
            <Stack.Screen name="SignUp_2" component={SignUp_2} />
            <Stack.Screen name="Home" component={RoutesTab} />
            
        </Stack.Group>

    </Stack.Navigator>

);

/*
<Stack.Screen name="MeusAnimais" component={MeusAnimais} />
        <Stack.Screen name="UpdatePet" component={UpdatePet} />

        <Stack.Screen name="UpdateUserData" component={UpdateUserData} />
        <Stack.Screen name="UserData" component={UserData} />
        <Stack.Screen name="Profile" component={Profile} />
*/
