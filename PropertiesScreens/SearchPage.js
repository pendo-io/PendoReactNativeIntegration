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
  TouchableOpacity,
} from 'react-native';
import { isStringsEquals } from '../Utils';
import { urlForQueryAndPage } from '../Modules/Networking';
import SearchResults from './SearchResults';
import Property from './Property';
import { createStackNavigator } from '@react-navigation/stack';
import { saveItem, getItem } from '../Modules/AsyncStore';
import Styles from '../Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { FAVORITES_ARR } from '../components/Constants';
import ModalScreen from './modalScreen';
const jsonLondon = require('../Modules/londonProperties.json');
class SearchPage extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      searchString: 'london',
      isLoading: false,
      message: '',
    };
  }

  executeQuery = query => {
    console.log('executeQuery Entry: ', query);
    this.setState({ isLoading: true });
    //debugger;
    if (jsonLondon.application_response_code.substr(0, 1) === '1') {
      saveItem(this.state.searchString, jsonLondon.listings).then(() => {
        this.handleResponse(jsonLondon.listings);
      });
      this.setState({ isLoading: false });
    } else {
      this.setState({
        message: 'Location not recognized; please try again.',
      });
    }


    //Unfortunatelly nastoria API doesnt work any more
    // fetch(query)
    //   .then((response) => {
    //     console.log('response: ', response);
    //     return response.json();
    //   })
    //   .then((json) => {
    //     console.log('json: ', json);
    //     if (json.response.application_response_code.substr(0, 1) === '1') {
    //       saveItem(this.state.searchString, json.response.listings).then(() => {
    //         this.handleResponse(json.response.listings);
    //       });
    //     } else {
    //       this.setState({
    //         message: 'Location not recognized; please try again.',
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log('error: ', error);
    //     this.setState({
    //       isLoading: false,
    //       message: 'Something bad happened ' + error,
    //     });
    //   });
  };

  handleResponse = (listings) => {
    this.setState({ isLoading: false, message: '' });
    //this.mergeTaggedPropertiesWithResponse(listings);
    this.pushResultsScreen(listings);
  };
  //Its very unefficient method and poor practice :(
  mergeTaggedPropertiesWithResponse = (response) => {
    // getItem(FAVORITES_ARR).then(taggedProps => {
    //   var mergedWithTags = response.map(prop => {
    //     prop.isTagged = false;
    //     if (taggedProps == null) {
    //       return prop;
    //     }
    //     for (const tagged of taggedProps) {
    //       if (isStringsEquals(tagged.title, prop.title)) {
    //         prop.isTagged = true;
    //         break;
    //       }
    //     }
    //     return prop;
    //   });
    //  this.pushResultsScreen(mergedWithTags);
    //});
  };

  pushResultsScreen = (listings) => {
    console.log('pushResultsScreen Entry');
    console.log('Properties found: ' + listings.length);
    //debugger;
    //Hooks only works with functional components
    //const navigation = useNavigation();
    //navigation.push('SearchResults');

    //The option with REF - in that case it should be added in the navigation Container
    //React.createRef().current?.navigate('SearchResults', { searchWord: this.state.searchString });

    //The old way in this case the navigation should be passed as a prop
    this.props.navigation.push('SearchResults', {
      title: 'Results',
      passProps: { searchWord: this.state.searchString },
    });
  };

  _onSearchPressed = () => {
    console.log('this.state.searchString: ', this.state.searchString);
    //Check if we cached this value
    getItem(this.state.searchString)
      .then((result) => {
        if (result == null) {
          const query = urlForQueryAndPage(
            'place_name',
            this.state.searchString,
            1,
          );
          this.executeQuery(query);
        } else {
          this.handleResponse(result);
        }
      })
      .catch((e) => {
        console.log('_onSearchPressed Failed: ', e.message);
      });
  };

  _onSearchTextChanged = (event) => {
    console.log('_onSearchTextChanged', event.nativeEvent.text);
    this.setState({ searchString: event.nativeEvent.text });
  };

  render() {
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size="large" />
    ) : null;
    return (
      <View style={styles.container} >
        <Text style={styles.description}>Search for houses to buy!</Text>
        <Text style={styles.description}>
          Search by place-name or postcode.
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this._onSearchTextChanged}
            placeholder="Search via name or postcode"
          />
          <Button onPress={this._onSearchPressed} color="#48BBEC" title="Go" />
        </View>
        <Image
          source={require('../Resources/house.png')}
          style={styles.image}
        />
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
}

const SearchStack = createStackNavigator();

export default function Search() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="SearchPage" component={SearchPage} options={({ navigation }) => ({
        title: 'Search Page',
        headerLeft: () => (
          <TouchableOpacity accessibilityLabel="hamburger"
            style={Styles.headerButton}
            onPress={() => navigation.openDrawer()}>
            <Icon name="bars" size={20} />
          </TouchableOpacity>
        ),
      })}
      />
      <SearchStack.Screen name="SearchResults" component={SearchResults} />
      <SearchStack.Screen name="Property" component={Property} />
    </SearchStack.Navigator>
  );
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center',
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC',
  },
  image: {
    width: 217,
    height: 138,
  },
});
