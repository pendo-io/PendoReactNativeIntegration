'use strict';
import React from 'react';
import {
    Text,
    View,
    Button,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const initialModalStack = ({ navigation }) => {
    return (
        ModalView(navigation)
    );
}

const ModalView = (navigation) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30 }}>This is a modal!</Text>    
            <Button onPress={() => navigation.push('Buttons')} title='Buttons Screen' />
        </View>
    );
}

export default initialModalStack;
