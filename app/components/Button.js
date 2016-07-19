'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default class button extends Component {

  render(){
    return (
      <TouchableHighlight underlayColor={"#E8E8E8"} onPress={this.props.onpress} style={this.props.buttonStyles}>
        <View style={{flexDirection: 'row'}}>
          <Text style={this.props.buttonTextStyles}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

AppRegistry.registerComponent('button', () => button);