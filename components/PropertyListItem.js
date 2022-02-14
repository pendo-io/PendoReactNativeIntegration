import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ImageButton} from './CustomeBtn';
import {StyleSheet, Image, View, TouchableHighlight, Text} from 'react-native';

export default class ListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.index);
  };

  tagPress = (index, isSelected) => {
    //Store in storage
    console.log('Search Results tag Pressed index: ', index);
    this.props.tagElementAtIndex(index, isSelected);
  };

  render() {
    const item = this.props.item;
    const price = item.price_formatted.split(' ')[0];

    return (
      <TouchableHighlight onPress={this._onPress} underlayColor="#dddddd">
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{uri: item.img_url}} />
            <View style={styles.textContainer}>
              <Text style={styles.price}>{price}</Text>
              <Text style={styles.title} numberOfLines={1}>
                {item.title}
              </Text>
            </View>
            <ImageButton
              tagPress={this.tagPress}
              index={this.props.index}
              isSelected={item.isTagged}
            />
            <View style={styles.moreContainer}>
              <Icon name="chevron-right" size={15} style={styles.moreIcon} />
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd',
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC',
  },
  title: {
    fontSize: 20,
    color: '#656565',
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  moreIcon: {
    color: '#d6d7da',
  },
});
