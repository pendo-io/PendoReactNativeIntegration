'use_strict';
import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class ImageButton extends Component<{}> {
  image = this.props.isSelected ? 'star' : 'star-o';
  isSelected = this.props.isSelected;
  constructor(props) {
    //console.log('ImageButton constructor');
    super(props);
    this.state = {
      index: props.index,
    };
    if (this.props.isSelected == true) {
      console.log('This button should have full star');
    }
    //this.tagPress = this.tagPress.bind(this);
  }

  tagPress = () => {
    debugger;
    this.isSelected = !this.isSelected;
    this.image = this.isSelected ? 'star' : 'star-o';
    this.setState({ ...this.state.index });
    this.props.tagPress(this.state.index, this.isSelected);
  };

  componentDidUpdate(prevProps) {
    console.log('CustomButton componentDidUpdate');
  }

  componentWillReceiveProps(nextProps) {
    console.log('CustomButton componentWillReceiveProps');
    if (this.isSelected !== nextProps.isSelected) {
      console.log('Props probably was changed');
      this.isSelected = this.props.isSelected;
      this.image = this.isSelected ? 'star' : 'star-o';
    }
  }

  render() {
    //console.log('render called');
    return (
      <TouchableOpacity onPress={this.tagPress}>
        <View style={styles.moreContainer}>
          <Icon name={this.image} size={30} />
        </View>
      </TouchableOpacity>
    );
  }
}

export { ImageButton };

const styles = StyleSheet.create({
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreContainer: {
    position: 'relative',
    bottom: 30,
  },
});
