import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from '../Styles';

export default function ProfileHome () {
    return (
      <View style={Styles.container}>
        <Text>Profile Screen</Text>
        <Icon name="user-circle" size={48} />
      </View>
    );
}

