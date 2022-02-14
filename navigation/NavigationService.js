import * as React from 'react';
//import { NavigationActions } from 'react-navigation';
import { CommonActions } from '@react-navigation/native';


let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.dispatch(
    CommonActions.navigate(routeName,{
      params,
    })
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
};