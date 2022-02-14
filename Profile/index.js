import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import  ProfileHome  from './Profile';
import { TouchableOpacity } from 'react-native';
import Styles from '../Styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileStack = createStackNavigator();

export default function Profile() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileHome" component={ProfileHome} options={({ navigation }) => ({
        title: 'Awesome app',
        headerLeft: () => (
          <TouchableOpacity
            style={Styles.headerButton}
            onPress={() => navigation.openDrawer()}>
            <Icon name="bars" size={20} />
          </TouchableOpacity>
        ),
      })} />
    </ProfileStack.Navigator>
  );
}

