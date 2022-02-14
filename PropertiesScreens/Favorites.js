'use_strict';
import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, FlatList } from 'react-native';
import ListItem from '../components/PropertyListItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from '../Styles';
import { removeItemFromArray, getItem } from '../Modules/AsyncStore';
import { EventRegister } from 'react-native-event-listeners';
import { FAVORITES_ARR, FAVORITES_CHANGED } from '../components/Constants';
import { isStringsEquals } from '../Utils'
//navigation.state.params.title,

class Favorites extends Component<{}> {
  state = { listings: [] };

  componentDidMount() {
    console.log('Favorites entry componentDidMount');
    this.subs = [this.props.navigation.addListener('willFocus', this.focused)];
    this.listener = EventRegister.addEventListener(
      FAVORITES_CHANGED,
      this.stateChenged,
    );
    this.updateState();
  }

  componentWillUnmount() {
    console.log('favorites componentWillUnmount Entry ');
    this.subs.forEach(sub => {
      sub.remove();
    });
    EventRegister.removeEventListener(this.listener);
  }

  stateChenged = data => {
    console.log('Favorites stateChenged Entry');
    if (data === this) {
      console.log('I am the caller do nothing');
      return;
    }
    this.updateState();
  };

  updateState = () => {
    getItem(FAVORITES_ARR).then(result => {
      console.log('result ', result);
      console.log('result.length ', result.length);
      this.setState({ listings: result });
    });
  };

  focused = () => {
    console.log('Favorites focused Entry');
  };

  static navigationOptions = ({ navigation }) => {
    console.log('Favorites navigationOptions Entry');
    return {
      title: 'Favorites',
      headerLeft: (
        <TouchableOpacity
          style={Styles.headerButton}
          onPress={() => navigation.openDrawer()}>
          <Icon name="bars" size={20} />
        </TouchableOpacity>
      ),
    };
  };

  _keyExtractor = (item, index) => index.toString();
  _renderItem = ({ item, index }) => (
    <ListItem
      item={item}
      index={index}
      onPressItem={this.onPressItem}
      tagElementAtIndex={this.tagElementAtIndex}
    />
  );

  onPressItem = index => {
    this.props.navigation.push('Property', {
      title: this.state.listings[index].title,
      passProps: {
        property: this.state.listings[index],
      },
    });
  };

  tagElementAtIndex = (index, isSelected) => {
    console.log('tagElementAtIndex entry111');
    const propToRemove = this.state.listings[index];
    const arrayToRemove = this.state.listings.filter(prop => {
      if (isStringsEquals(prop.title, propToRemove.title) && prop.latitude === propToRemove.latitude) {
        return false;
      } else {
        return true;
      }
    });
    //arrayToRemove.splice(index, 1);
    this.setState({ listings: arrayToRemove });
    const callBack = () => {
      console.log('Favorites callback get called');
      EventRegister.emit(FAVORITES_CHANGED, this);
    };
    removeItemFromArray(FAVORITES_ARR, propToRemove, callBack);
  };

  render() {
    console.log('Favorites entry render');
    return (
      <FlatList
        data={this.state.listings}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}
const FavoritesStack = createStackNavigator();

export default () => {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen name="Favorites" component={Favorites} />
    </FavoritesStack.Navigator>
  );
};
// export default createStackNavigator({
//   Favorites,
// });
