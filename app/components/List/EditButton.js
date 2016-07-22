import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import Icon from './BaseIcon';

export default class EditButton extends Component {

  render(){
    return (
      <Icon name='pencil-square-o' onPress={() => this.props.onPress(this)} />
    );
  }
}