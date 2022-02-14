
'use strict';
import React from 'react';
import {View, Text, Button} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
const TopBars = () => {
    return (
        <Tab.Navigator
          initialRouteName="Feed"
          tabBarOptions={{
            activeTintColor: '#e91e63',
            labelStyle: { fontSize: 12 },
            style: { backgroundColor: 'powderblue' },
          }}
        >
          <Tab.Screen
            name="Feed"
            component={Feed}
            options={{ tabBarLabel: 'Feed' }}
          />
          <Tab.Screen
            name="Notifications"
            component={Notifications}
            options={{ tabBarLabel: 'Notifications' }}
          />
        </Tab.Navigator>
      );
}

const Feed = () => {
    return(
        <View>
            <Text style={{textAlign:'center'}}>Feed</Text>
            <Button title="Feed Button" onPress={()=>{console.log("FeedButton pressed")}}></Button>

        </View>

    );
}

const Notifications = () => {
    return(
        <View>
            <Text>Notifications</Text>
            <Button title="Notification Button" onPress={()=>{console.log("Notification pressed")}}></Button>
        </View>

    );
}

export default TopBars;