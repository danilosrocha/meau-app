import React from "react";
import styled from 'styled-components/native';
import { useNavigation } from "@react-navigation/native";

const Container = styled.SafeAreaView`
    height: 50px;
    width: 100%;
`

const StatusBar = styled.StatusBar`
    background-color: #fff;
    flex: 1;
`

const HeaderArea = styled.View`
    flex: 1;
    background-color: #fff;
    padding-left: 20px;
    padding-right: 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom-color: black;
    border-bottom-width: 0.2px;     
`

const ButtonChat = styled.TouchableOpacity`
    width: 20px;
    height: 20px;
    justify-content: center;
    align-items: center;
`

const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
`;

const Icon = styled.Image`
    width: 20px;
    height: 20px;
`;


export default ({ title }) => {
    const navigation = useNavigation();

    const handleGoChat = () => {
        navigation.navigate("Messages")
    }

    return (
        <Container>
            <StatusBar backgroundColor="black" />

            <HeaderArea >
                <Title>{title}</Title>
                <ButtonChat onPress={() => handleGoChat()}>
                    <Icon source={require("../../assets/Icons/messenger.png")} />
                </ButtonChat>
            </HeaderArea>

        </Container>

    );
};