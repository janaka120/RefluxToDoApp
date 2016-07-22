import React, { Component } from 'react';
import { Alert, StyleSheet } from 'react-native';

import Icon from './BaseIcon';

export default class DeleteButton extends Component {

  render(){
    return (
      <Icon name='trash-o' onPress={this.onPress.bind(this)} />
    );
  }

  onPress(){
     Alert.alert(
      'Delete Comfirmation Required',
      'Are you sure you want to delete selected note?',
      [{
        text: 'OK', 
        onPress: () => this.props.onPress(this)
      },
      {
        text: 'Cancel'
      }]
    );  
  }
}