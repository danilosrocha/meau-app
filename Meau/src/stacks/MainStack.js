import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Preload from '../screens/Preload';
import SignIn from '../screens/SignIn';
import SignUp_1 from '../screens/SignUp/index_1';
import SignUp_2 from '../screens/SignUp/index_2';
import Home from '../screens/Home';
import UpdateUserData from '../screens/UpdateUserData';
import UserData from '../screens/UserData/index';
import Profile from '../screens/Profile';
import UpdatePet from '../screens/UpdatePet';
import MeusAnimais from '../screens/MeusAnimais';


const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        initialRouteName='SignIn'
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="MeusAnimais" component={MeusAnimais}/>
        <Stack.Screen name="UpdatePet" component={UpdatePet}/>
        <Stack.Screen name="Preload" component={Preload}/>
        <Stack.Screen name="SignIn" component={SignIn}/>
        <Stack.Screen name="SignUp_1" component={SignUp_1}/>
        <Stack.Screen name="SignUp_2" component={SignUp_2}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="UpdateUserData" component={UpdateUserData}/>
        <Stack.Screen name="UserData" component={UserData}/>
        <Stack.Screen name="Profile" component={Profile}/>
    </Stack.Navigator>
);
