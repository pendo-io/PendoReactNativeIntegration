import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

export function withAppWrapper(Component) {
    return <NavigationContainer>{Component()}</NavigationContainer>;
}

