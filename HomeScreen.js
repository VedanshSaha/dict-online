import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = { word: '', definition: '', phonetics: '' };
  }
  getWord = (word) => {
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        console.log(response);
        //var responseObject = JSON.parse(response);
        var word = response[0].word;
        console.log(word);
        var definition = response[0].meanings[0].definitions[0].definition;
        console.log(definition);
        this.setState({
          word: word.trim(),
          definition: definition.trim(),
        });
      });
  };

  render() {
    return (
      <View>
        <Header
          backgroundColor={'#dde'}
          centerComponent={{
            text: 'Dictionary',

            style: { color: 'white', fontSize: 30, fontFamily: 'monospace' },
          }}
        />

        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchedPressed: false,
              word: 'loading....',
              lexicalCategory: '',
              examples: [],
              definition: '',
            });
          }}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchedPressed: true });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.textIn}> Search </Text>{' '}
        </TouchableOpacity>

        <Text style={{ fontSize: 18, color:'#990', textAlign : 'center'  }}>{this.state.word}</Text>
        <Text style={{ fontSize: 18, color:'#999', textAlign : 'center' }}>{this.state.definition}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    borderColor: '#ccc',
    outline: 'none',
  },
  searchButton: {
    width: '40%',
    height: 50,
    justifyContent : 'center',
    alignSelf: 'center',
    alignContent : 'center',
    padding: 10,
    margin: 10,
    borderWidth: 4,
    borderRadius: 20,
    borderColor: '#eee',
    backgroundColor: '#aaa'
  },
  textIn: {
    textAlign: 'center',
    fontSize: 25,
    color : '#fff',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
