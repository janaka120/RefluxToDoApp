import React, { Component } from 'react';
import { AppRegistry, View, Text } from 'react-native';
import List from './List';

export default class App extends Component {
    render() {
        return (
        	<List/>
        	);
    }
}

AppRegistry.registerComponent('App', () => App);
