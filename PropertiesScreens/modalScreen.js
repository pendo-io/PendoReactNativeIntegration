'use strict';
import React from 'react';
import {
    Text,
    View,
    Button,
} from 'react-native';
import { createStackNavigator,HeaderBackButton  } from '@react-navigation/stack';
import initialModalStack from './InitialModalStack';
import Buttons from './Buttons';

const ModalStack = createStackNavigator();
const ModalScreen = ({ navigation }) => {
    return (
        <ModalStack.Navigator>
            <ModalStack.Screen 
            name="initialModalStack"
            component={initialModalStack} 
            options={{title: 'Components', headerBackTitleVisible:false, 
            headerLeft: (props) => {return <Button title='Dismiss' onPress={()=>{navigation.goBack()}}></Button>;} 
              }}>
            </ModalStack.Screen>
            <ModalStack.Screen
             name="Buttons"
             component={Buttons}
             options={{title:'Buttons'}}>   
             </ModalStack.Screen>
        </ModalStack.Navigator>
    );
}


export default ModalScreen;
