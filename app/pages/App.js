import React, { Component } from 'react';
import { View } from 'react-native';
import Form from './Form';
import List from './List';
import Home from './Home';

export default class App extends Component {

	constructor(props) {
		super(props);
	}

    render() {
        return (
        	<View>
        		<Form ref='form'/>
        		<List onEditNote={(noteId, text) => this.refs.form.editNote(noteId, text)}/>
        	</View>
    	);
    }
}
 