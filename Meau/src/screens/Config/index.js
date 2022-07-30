import { auth } from '../../../firebase'
import { useNavigation } from '@react-navigation/native'
import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText
} from './styles'

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
            <InputArea>
                <CustomButton onPress={handleSignOut}>
                    <CustomButtonText>Sign Out</CustomButtonText>
                </CustomButton>
            </InputArea>

        </Container>
    )
}

