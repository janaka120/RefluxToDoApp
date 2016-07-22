import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Home extends Component {

	constructor(props) {
		super(props);
	}

    render() {
        return (
	    	<View style = {styles.container}>
	    	<Text style={styles.header}> Reflux TODO APP</Text>
	    	  <Icon
			    name="home"
			    onPress={() => alert('Hi, Welcome to ToDo App.')} 
			    style={styles.icon} />
	    	</View>
    	);
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  header: {
  	flex: 1,
  	fontSize: 35,
  	marginLeft: 10,
  	marginBottom: 10,
  	marginTop: 400,
  	textAlign: 'center'
  },
  icon: {
  	fontSize: 150,
  	flex: 1,
  	textAlign:'center',
  	marginTop: 100,
  }
});

AppRegistry.registerComponent('Home', () => Home);
