'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
  Dimensions,
  FlatList,
  Platform,
} from 'react-native';
import { capitalize } from '../Utils';

export default class Property extends Component<{}> {
  _property = this.props.route.params.passProps.property;

  constructor(props) {
    super(props);
    this.props.navigation.setOptions({ title: this._property.title });
  }

  _data = [
    { Price: this._property.price_formatted.toString() },
    { Type: this._property.property_type.toString() },
    { Description: this._property.summary.toString() },
    { Keywords: this._property.keywords.toString() },
  ];
  _keyExtractor = (item, index) => index.toString();

  B = props => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>;
  //<this.B>{key}: </this.B>
  _renderItem = ({ item, index }) => {
    const key = Object.keys(item)[0];
    const value = item[key];
    return (
      <View style={styles.item}>
        <Text style={[styles.title, { marginVertical: 5 }]}>
          <Text style={{ fontWeight: 'bold' }}>{key}: </Text>
          {value}
        </Text>
      </View>
    );
  };

  _propertyFactsList = (
    <FlatList
      ItemSeparatorComponent={() => (
        <View
          style={{
            width: Dimensions.get('window').width,
            height: 1,
            backgroundColor: 'lightgray',
          }}
        />
      )}
      style={{ marginLeft: 20 }}
      data={this._data}
      keyExtractor={this._keyExtractor}
      renderItem={this._renderItem}
    />
  );

  render() {
    return (
      <View>
        <Image
          style={styles.mainImage}
          source={{ uri: this._property.img_url }}
        />
        <View>
          <Text style={styles.price}>{this._property.price_formatted}</Text>
          <Text style={styles.popertyDescription}>
            {capitalize('house')}, {this._property.bedroom_number} bedroom,{' '}
            {this._property.bathroom_number} bathroom
          </Text>
          <Text style={styles.address}>{this._property.title} </Text>
          <Text style={[styles.price, { marginTop: 10, marginBottom: 10 }]}>
            Facts{' '}
          </Text>
          {this._propertyFactsList}
        </View>
        <Button onPress={() => {
          this.props.navigation.navigate('Modal');
        }} title="Show Modal" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainImage: {
    height: 300,
    width: Dimensions.get('window').width,
  },
  price: {
    fontFamily: 'System',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  popertyDescription: {
    fontFamily: 'System',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 20,
    //textTransform: 'capitalize',
  },
  address: {
    fontFamily: 'System',
    fontSize: 15,
    fontWeight: 'normal',
    marginLeft: 20,
    color: 'gray',
    //textTransform: 'capitalize',
  },
});
