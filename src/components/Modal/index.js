import React from 'react';
import { BackButton, Name } from './styles'
import { WebView } from 'react-native-webview';
import {Feather } from '@expo/vector-icons';

function ModalLink(Link, title, closeModal) {
    return (
        <>
            
                <BackButton onPress={closeModal}>
                    <Feather name="x" size={35} color="#FFF" />
                    <Name>{title}</Name>
                </BackButton>

                <WebView
                    source={{ uri: Link }}
                />
            
        </>

    )
}

export default ModalLink;