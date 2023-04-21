/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
'use strict';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import PropertiesTabs from './PropertiesScreens';
import Profile from './Profile';
import {
  PendoSDK,
  NavigationLibraryType,
  WithPendoReactNavigation,
} from 'rn-pendo-sdk';
import {NavigationContainer} from '@react-navigation/native';
import ModalScreen from './PropertiesScreens/modalScreen';

console.disableYellowBox = true;

const navigationOptions = {library: NavigationLibraryType.ReactNavigation};
const key = 'APP_KEY';

//DEBUG MODE SHOULD BE SET ONLY FOR DEBUG PURPOSES ONLY
PendoSDK.setDebugMode(true);
PendoSDK.setup(key, navigationOptions, {});
PendoSDK.startSession(
  'visitor1',
  'account1',
  {visitorMeta1: 'visitorMetaValue'},
  {accountMeta1: 'accountMetaValue'},
);

export const noBannerScreenOptions: StackNavigationOptions = {
  gestureEnabled: false,
  headerStyle: {
    elevation: 0,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
};

const Drawer = createDrawerNavigator();
const MainStak = createStackNavigator();

const DrawerFunc = () => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerType="front"
      drawerPosition="left"
      initialRouteName="Properties">
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Properties" component={PropertiesTabs} />
    </Drawer.Navigator>
  );
};

const MainStackScreen = () => {
  return (
    <MainStak.Navigator mode="modal" screenOptions={{headerShown: false}}>
      {/* initialRouteName="Properties" */}
      <MainStak.Screen name="Drawer" component={DrawerFunc} />
      <MainStak.Screen name="Modal" component={ModalScreen} />
      {/* <MainStak.Screen name="Major" component={DrawerFunc} /> */}
    </MainStak.Navigator>
  );
};

function MyDrawer() {
  const PendoNavigationContainer = WithPendoReactNavigation(NavigationContainer);
  return (
    <PendoNavigationContainer>{MainStackScreen()}</PendoNavigationContainer>
  );
}

export default MyDrawer;
//ADDITIONAL OPTIONS COULD BE SUPPLIED AS SECOND PARAMETER TO WithPendoReactNavigation

//-------CUSTOM BOTTOM BAR----------

//const PendoNavigationContainer = WithPendoReactNavigation(NavigationContainer,{ios:{isFirstScreenRelatedToFirstTagIOS: true ,bottomBarBaseNameCandidates:['^mytabbar$']},android:{bottomBarBaseNameCandidates:['^mytabbar$']}});

//-------CUSTOM BOTTOM BAR----------

//-------CUSTOM ITEMS---------------

//FOR CUSTOM ITEMS THAT ARE NOT PART OR REACT-NATIVE UI ELEMENTS: (PLEASE NOTE: THIS IS AN EDGE CASE AS ALL THE ELEMENTS SHOULD BE RECOGNIZED BY DEFAULT)
// const PendoNavigationContainer = WithPendoReactNavigation(NavigationContainer, {nativeIDs:["YOUR_NATIVE_ELEMENT_ID"]});

//YOU MUST ADD YOUR_NATIVE_ELEMENT_ID TO THE ELEMENT YOU WANT TO BE RECOGNIZABLE WITH PENDO, AS WE WILL SCAN ALL THE ELEMENTS UNDER IT.
//FOR INSTANCE:
{
  /*
      <TouchableOpacity onPress={open} nativeID={"YOUR_NATIVE_ELEMENT_ID"}>
    </TouchableOpacity>
    */
}

//-------CUSTOM ITEMS---------------

const styles = StyleSheet.create({
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
    marginTop: 65,
  },
  container: {
    flex: 1,
  },
});
