import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import Button from './BaseButton';

export default class CreateButton extends Component {

  render(){
    return (
      <Button onPress={() => this.props.onPress(this)} name={this.props.name} style={styles.button}/>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#529ecc'
  }
});