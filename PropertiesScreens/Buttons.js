'use strict';
import React, {useState} from 'react';
import {
    Text,
    View,
    Button,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const ButtonsScreen = ({ navigation }) => {
    return (
        ButtonView(navigation)
    );
}

const ButtonView = (navigation) => {
    const [btnEnable, setEnableBtn] = useState(false);
    return (
        <View style={{ flex: 1,flexDirection:'row', alignItems: 'flex-start', justifyContent: 'space-around', marginTop:20 }}>
            <Button accessibilityLabel={'button111'} title={'Change Action'} onPress={()=>setEnableBtn(!btnEnable)}></Button>
            <ActionBarItem onPress={()=>{}} label={''} enabled={btnEnable}></ActionBarItem>
        
        </View>
    );
}

const ActionBarItem = ({onPress,label, enabled}) => {
    const Conatiner = enabled ? TouchableOpacity : View;
    const HandlePress = enabled ? onPress : null;
    const opacity = enabled ? 1.0 : 0.4;

    return (
    <View styles={styles.appButtonContainerEnabled}>
        <Conatiner onPress={HandlePress} style={[styles.appButtonContainerEnabled,{opacity:opacity}]} >
            <Text>{getStatus(enabled)}</Text>
        </Conatiner>
        </View>
    )
};

const getStatus = (isEnable) => {
    if (isEnable == true) {
        return 'Enabled';
    }
    return 'Disabled'
};

const styles = StyleSheet.create({
    appButtonContainerEnabled: {
      elevation: 8,
      backgroundColor: "#007bff",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: 100,
      height: 50,
      justifyContent:'center',
      alignItems:'center',
    },
    appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    }
  });



export default ButtonsScreen;

