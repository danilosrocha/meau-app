import React, { useEffect } from 'react'
import { ImageBackground } from 'react-native'
import { Container, LoadingIcon } from './styles'
import { useNavigation } from '@react-navigation/native'

export default () => {

  const navigation = useNavigation();
  

  useEffect(() => {
    token = 0;
    if (token !== 0) {

    } else {
      setTimeout(function () {
        navigation.navigate('Profile');
      }, 1000);
    }

  }, [])

  return (
    <ImageBackground source={require('../../../assets/1.png')} style={{ flex: 1 }}>
      <Container>
        <LoadingIcon size="large" color="#ffffff" />
      </Container>
    </ImageBackground>
  );
}
