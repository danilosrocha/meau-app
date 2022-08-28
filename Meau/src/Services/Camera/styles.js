import React from 'react';
import styled from 'styled-components/native';

/* VIEW */
export const Container = styled.SafeAreaView`
    background-color: #58BD97;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const ContentImg = styled.TouchableOpacity`
    flex: 1;
    border-radius: 100px;  
    margin-bottom: 20px;
    align-items: center;
    justify-content: center;
`;

/* IMAGE */

export const Avatar = styled.Image`
    width: 120px;
    height: 120px;
    border-radius: 100px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
    margin-bottom: 50px
`;