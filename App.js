/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
'use strict';
import React from 'react';
import { View, Text } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackNavigationOptions,createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import PropertiesTabs from './PropertiesScreens';
import Profile from './Profile';
import { PendoSDK, NavigationLibraryType , withPendoRN} from 'rn-pendo-sdk';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import ModalScreen from './PropertiesScreens/modalScreen';
import { useRef } from 'react';

console.disableYellowBox = true;

const initParams = {
  visitorId: 'Property Finder9',
  accountId: 'react native account',
};

const navigationOptions = { 'library': NavigationLibraryType.ReactNavigation };
const key = 'APP_KEY'; 

//DEBUG MODE SHOULD BE SET ONLY FOR DEBUG PURPOSES ONLY
PendoSDK.setDebugMode(true);
PendoSDK.setup(key,navigationOptions,{});
PendoSDK.startSession("visitor1","acoount1", null, null);


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
    <Drawer.Navigator screenOptions={{ headerShown: false }} drawerType="front" drawerPosition="left" initialRouteName="Properties"  >
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Properties" component={PropertiesTabs} />
    </Drawer.Navigator>
  );
}

const MainStackScreen = () => {
  return (
    <MainStak.Navigator  mode="modal" screenOptions={{ headerShown: false }}  >
      {/* initialRouteName="Properties" */}
      <MainStak.Screen name="Drawer" component={DrawerFunc} />
      <MainStak.Screen name="Modal" component={ModalScreen} />
      {/* <MainStak.Screen name="Major" component={DrawerFunc} /> */}
      
    </MainStak.Navigator>
  )
}

function MyDrawer(props) {
  const navigationRef = useRef();
  return (
    <NavigationContainer 
    ref={navigationRef}
    onStateChange={()=> {
      console.log("onStateChangeCalled");
      const state = navigationRef.current.getRootState()
      props.onStateChange(state);
    }}
    onReady ={()=>{
        console.log("OnReady called");
        const state = navigationRef.current.getRootState()
        console.log("name: ", navigationRef.current.getCurrentRoute().name);
        props.onStateChange(state);
    }} >
      {MainStackScreen()}
    </NavigationContainer >
  )
};
                                      
export default withPendoRN(MyDrawer);
//ADDITIONAL OPTIONS COULD BE SUPPLIED AS SECOND PARAMETER TO withPendoRN

//-------CUSTOM BOTTOM BAR---------- 

//export default withPendoRN(MyDrawer,{ios:{isFirstScreenRelatedToFirstTagIOS: true ,bottomBarBaseNameCandidates:['^mytabbar$']},android:{bottomBarBaseNameCandidates:['^mytabbar$']}});

//-------CUSTOM BOTTOM BAR----------

//-------CUSTOM ITEMS---------------

//FOR CUSTOM ITEMS THAT ARE NOT PART OR REACT-NATIVE UI ELEMENTS: (PLEASE NOTE: THIS IS AN EDGE CASE AS ALL THE ELEMENTS SHOULD BE RECOGNIZED BY DEFAULT)
//export default withPendoRN(YOUR_MAIN_FUNCTION,{nativeIDs:["YOUR_NATIVE_ELEMENT_ID"]});

//YOU MUST ADD YOUR_NATIVE_ELEMENT_ID TO THE ELEMENT YOU WANT TO BE RECOGNIZABLE WITH PENDO
//FOR INSTANCE:
{/* 
  <TouchableOpacity onPress={open} nativeID={"YOUR_NATIVE_ELEMENT_ID"}>      
</TouchableOpacity>  
*/}

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
