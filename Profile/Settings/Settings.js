'use strict';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TopBars from './SettingsTopBars';




const SettingsStack = createStackNavigator();

const Settings = () => {
        return (
            <SettingsStack.Navigator>
                <SettingsStack.Screen name="SettingsInitial" component={TopBars} options={{ title: 'Settings' }} ></SettingsStack.Screen>
            </SettingsStack.Navigator>
            
        );
} 

export default Settings;