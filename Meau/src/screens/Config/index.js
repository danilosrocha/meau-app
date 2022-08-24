import { auth } from '../../../firebase'
import { useNavigation } from '@react-navigation/native'
import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SimpleText
} from './styles'
import Header from "../../components/Header";

export default () => {

    const navigation = useNavigation();

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.navigate("SignIn")
                console.log('Deslogado');
            })
            .catch(error => alert(error.message))
    }

    return (
        <Container>
            <Header
                title={"Configurações"}
            />
            <SimpleText>Email: {auth.currentUser?.email}</SimpleText>
            <InputArea>
                <CustomButton onPress={handleSignOut}>
                    <CustomButtonText>Sign Out</CustomButtonText>
                </CustomButton>
            </InputArea>

        </Container>
    )
}

