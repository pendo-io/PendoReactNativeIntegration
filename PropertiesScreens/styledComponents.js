    import React from "react";
    import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
    //import styled from 'styled-components/native'

    export const StyledButtonLink = (props) => {
        return (

            <TouchableOpacity onPress={props.onPress}>
                <View styles={{...styles.button,...styles.props}}>
                    <Text>
                        {props.children ?? "Button"}
                    </Text>

                </View>

            </TouchableOpacity>
        );
    }


//     export const PageHeader = styled.View`
//     position: absolute;
//     top: 0;
//     left: 0;
//     background-color: #fefefe;
//     z-index: 999;
//     border-bottom-left-radius: 20px;
//     border-bottom-right-radius: 20px;
//     width: 100%;
//   `


    const styles = StyleSheet.create({
        button: {
            backgroundColor: "#FF0000"
        }
    });

      