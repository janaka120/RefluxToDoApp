'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default class Button extends Component {

  render(){
    return (
      <TouchableHighlight {...this.props}
        onPress={this.props.onPress(this)}
        underlayColor={"#E8E8E8"}
        style={[styles.button, this.props.style]}>
        <View style={styles.container}>
          <Text style={styles.text}>{this.props.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  button: {
    flex:1,
    height: 55,
    margin: 20,
    marginRight: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    marginTop: 5
  },
  text: {
    flex: 1,
    height: 55,
    color: '#FFF',
    fontSize: 24,
    textAlign: 'center'
  }
});
