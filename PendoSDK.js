import {NativeModules, Platform} from 'react-native';

const {ReactNativePendo} = NativeModules;

const PendoSDK = {
  initSdk: function(appKey, initParams) {
    try {
      ReactNativePendo.initSDK(appKey, initParams);
    } catch (e) {
      console.warn(`initSdk failed with message: ${e.message}`);
      throw e;
    }
  },
  track: function(name, params) {
    try {
      if (name === null || name.length === 0) {
        throw new Error('Event Name is required');
      }
      ReactNativePendo.track(name, params);
    } catch (e) {
      console.warn(`track failed with message: ${e.message}`);
      throw e;
    }
  },
  clearVisitor: function() {
    try {
      ReactNativePendo.clearVisitor();
    } catch (e) {
      console.warn(`clearVisitor failed with message: ${e.message}`);
      throw e;
    }
  },
  switchVisitor: function(visitorId, accountId, visitorData, accountData) {
    try {
      ReactNativePendo.switchVisitor(
        visitorId,
        accountId,
        visitorData,
        accountData,
      );
    } catch (e) {
      console.warn(`switchVisitor failed with message: ${e.message}`);
      throw e;
    }
  },
  setVisitorData: function(visitorData) {
    try {
      ReactNativePendo.setVisitorData(visitorData);
    } catch (e) {
      console.warn(`setVisitorData failed with message: ${e.message}`);
      throw e;
    }
  },
  setAccountData: function(accountData) {
    try {
      ReactNativePendo.setAccountData(accountData);
    } catch (e) {
      console.warn(`setAccountData failed with message: ${e.message}`);
      throw e;
    }
  },
};
export default PendoSDK;
