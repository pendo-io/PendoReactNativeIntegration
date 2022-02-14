'use strict';

import AsyncStorage from '@react-native-async-storage/async-storage';
import londonJson from './londonProperties.json';
import { isStringsEquals } from '../Utils';

const saveItem = async (key, item) => {
  try {
    console.log('saveItem entry');
    await AsyncStorage.setItem(key, JSON.stringify(item));
    console.log('saveItem end');
  } catch (e) {
    console.log('saveItem failed' + e.message);
  }
};

const getItem = async key => {
  let result = await AsyncStorage.getItem(key);
  // if (result == null && isStringsEquals(key, 'london')) {
  //   saveItem('london', londonJson);
  //   result = londonJson;
  // }
  if (result == null) {
    return null;
  }
  result = JSON.parse(result);
  return result;
};

const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('removeItem failed' + e.message);
  }
};

//Ugly code :)horrible approach
const saveItemInArray = (arrayName, item, callback) => {
  try {
    getItem(arrayName).then(result => {
      var arr = result == null ? [] : result;
      arr.push(item);
      saveItem(arrayName, arr).then(() => {
        typeof callback == 'function' && callback();
      });
    });
  } catch (e) {
    console.log('saveItemInArray failed: ', e.message);
  }
};

const removeItemFromArray = (arrayName, item, callback) => {
  try {
    getItem(arrayName).then(resultArr => {
      if (resultArr && resultArr.length) {
        const filteredArr = resultArr.filter(fitem => {
          return isStringsEquals(fitem.title, item.title) ? false : true;
        });
        if (filteredArr.length !== resultArr.length) {
          saveItem(arrayName, filteredArr).then(() => {
            typeof callback == 'function' && callback();
          });
        }
        console.log('removeItemFromArray end');
      }
    });
  } catch (e) {
    console.log('removeItemFromArray failed: ', e.message);
  }
};

export { saveItem, getItem, removeItem, saveItemInArray, removeItemFromArray };
