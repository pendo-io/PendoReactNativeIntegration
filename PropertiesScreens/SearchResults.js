'use strict';
import React, { Component } from 'react';
import {
  saveItemInArray,
  removeItemFromArray,
  getItem,
} from '../Modules/AsyncStore';
import { isStringsEquals } from '../Utils';
import ListItem from '../components/PropertyListItem';
import { FlatList } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import { FAVORITES_ARR, FAVORITES_CHANGED } from '../components/Constants';

export default class SearchResults extends Component<{}> {
  searchWord = this.props.route.params.passProps.searchWord;
  state = { listings: [] };

  componentDidMount() {
    console.log('SearchResults entry componentWillMount');
    this.subs = [this.props.navigation.addListener('willFocus', this.focused)];
    this.listener = EventRegister.addEventListener(
      FAVORITES_CHANGED,
      this.stateChenged,
    );
    this.updateState();
  }

  componentWillUnmount() {
    console.log('SearchResults entry componentDidMount');
    this.subs.forEach(sub => {
      sub();
    });
    EventRegister.removeEventListener(this.listener);
  }

  stateChenged = data => {
    console.log('SearshResults stateChenged Entry');
    if (data === this) {
      console.log('I am the caller do nothing');
      return;
    }
    this.updateState();
  };

  //Super Ugly and unefficient
  updateState = () => {
    console.log('SearchResults update State entry');
    //debugger;
    getItem(this.searchWord).then(response => {
      getItem(FAVORITES_ARR).then(taggedProps => {
        const listings = response.map(prop => {
          prop.isTagged = false;
          if (taggedProps == null) {
            return prop;
          }
          for (const tagged of taggedProps) {
            if (isStringsEquals(tagged.title, prop.title) && (prop.latitude === tagged.latitude)) {
              prop.isTagged = true;
              break;
            }
          }
          return prop;
        });
        //debugger; 
        this.setState({ listings: listings });
      });
    });
  };

  focused = () => {
    console.log('SearchResults focused Entry');
  };

  onPressItem = index => {
    this.props.navigation.push('Property', {
      title: this.state.listings[index].title,
      passProps: {
        property: this.state.listings[index],
      },
    });
  };

  tagElementAtIndex = (index, isSelected) => {
    console.log('tagElementAtIndex entry');
    //debugger;
    const propToSave = this.state.listings[index];
    const callBack = () => {
      console.log('SearchResults callback get called');
      EventRegister.emit(FAVORITES_CHANGED, this);
    };

    if (isSelected) {
      propToSave.isTagged = true;
      saveItemInArray(FAVORITES_ARR, propToSave, callBack);
    } else {
      propToSave.isTagged = false;
      removeItemFromArray(FAVORITES_ARR, propToSave, callBack);
    }
  };

  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item, index }) => (
    <ListItem
      item={item}
      index={index}
      onPressItem={this.onPressItem}
      tagElementAtIndex={this.tagElementAtIndex}
    />
  );

  render() {
    console.log('Search Results render Entry');
    return (
      <FlatList
        data={this.state.listings}
        extraData={this.state.listings}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}
