import React, { Component } from 'react';
import {StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class BaseIcon extends Component {

  render(){
    return (
      <Icon
        name={this.props.name} 
        onPress={() => this.props.onPress(this)} 
        style={styles.icon} />
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    marginLeft: 3,
    marginRight: 8,
    marginBottom:10,
    fontSize: 30,
    flex:1
  }
});