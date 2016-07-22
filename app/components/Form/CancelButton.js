import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import Button from './BaseButton';

export default class CancelButton extends Component {

  render(){
    return (
	  <Button 
	  	onPress={() => this.props.onPress(this)} style={styles.button} name={this.props.name}/>
  	);
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ff0000'
  }
});