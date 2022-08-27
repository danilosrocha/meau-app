import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #58BD97;
    flex: 1;
`;

export const WelcomeSign = styled.Text`
    font-size: 20px;
    color: #000000;
    margin-top: 60px;
    height: 60px;
`;

export const InputArea = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;

`;

export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    width: 85%;
    background-color: #fff;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

`;
export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #000000;
`;

export const SimpleText = styled.Text`
    font-size: 18px;
    padding: 20px;
    color: #000000;
    text-align: center;
`;

export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 20px;
`;