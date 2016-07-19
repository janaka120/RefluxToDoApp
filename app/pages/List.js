import React, { Component } from 'react';
import { AppRegistry, View, TextInput, StyleSheet, Text, ListView, TouchableOpacity, RecyclerViewBackedScrollView, Alert } from 'react-native';
import Button from '../components/Button';
import ListStore from '../Stores/ListStore';
import ListAction from '../Actions/ListAction';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class List extends Component {

	constructor(props) {
		super(props);

		this.state = {
			noteID: '',
			note: '',
			buttonName: 'ADD',
      length: 0,
			notes: new ListView.DataSource({
		    rowHasChanged: (r1, r2) => r1 != r2
		  })
		};
	}

	componentDidMount() {
		this.unsubscribe = ListStore.listen((notes)=>{
			this.setState({
        length: notes.length,
		    notes: this.state.notes.cloneWithRows(notes),
		    note: '',
		    noteID: '',
		    buttonName: 'ADD'
	    });
		});	
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	renderRow(rowData, sectionID, rowID, highlightRow){
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={styles.listItemText} >{rowData}</Text>
        <Icon name="pencil" onPress= {this._onEditHandler.bind(this, rowID, rowData)} style={styles.listEditIcon}></Icon>
        <Icon name="eraser" onPress= {this._onRemoveHandler.bind(this, rowID)} style={styles.listRemoveIcon}></Icon>
      </View>
    );
	}

	_onEditHandler(noteID, note){
		this.setState({
			buttonName: 'EDIT',
			note : note,
			noteID: noteID});
	}

	_onRemoveHandler(noteID){
		Alert.alert(
			'Delete Comfirmation Required',
			'Are you sure you want to delete selected note?',
			[{
		    	text: 'OK', 
		    	onPress: () => {
		    		if (noteID){
				  		ListAction.removeNote({
				  			id : parseInt(noteID)
				  		});
							return;
						}
		    	}
		  	}]
		);	
	}

  render() {
    return (
    	<View style={styles.container}>
    		<Text
	        style={styles.appTitle}>
	        Reflux ToDo App
	        </Text>
        <TextInput
	        style={styles.textInput}
	        placeholder={"Create your note"}
	        onChangeText={(text) => this.setState({note: text})}
	        value={this.state.note} />
        <View style={{flexDirection: 'row'}}>
          <Button 
  	        text={this.state.buttonName}
  	        onpress={this._onPressHandler.bind(this)} 
  	        buttonStyles={styles.primaryButtonAdd} 
  	        buttonTextStyles={styles.primaryButtonText} />
          <Button 
            text= 'Cancel'
            onpress={this._onClearHandler.bind(this)} 
            buttonStyles={styles.primaryButtonCancel} 
            buttonTextStyles={styles.primaryButtonText} />
        </View>
        <Text style={styles.listTitle}>My Notes</Text>
        {(() => {
                  if (this.state.length > 0) {
                    return (
                      <ListView
                        dataSource = {this.state.notes}
                        renderRow = {this.renderRow.bind(this)}>
                      </ListView>
                    );
                  }else{
                    return(
                    <Text style={styles.listEmpty}>You have not any Notes.</Text>
                    );
                  }
                })
        ()}
  		</View>   		
    );
  }

  _onPressHandler(){
  	if (this.state.note !== ''){
  		if (this.state.noteID !== ''){
	  		ListAction.updateNote({
	  			id : parseInt(this.state.noteID),
	  			note: this.state.note
	  		});
	  		return;
	  	}
	  	ListAction.createNote(this.state.note);
	  }
  }

  _onClearHandler(){
    this.setState({
        note: '',
        noteID: '',
        buttonName: 'ADD'
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    height: 40, 
    borderColor: 'red', 
    borderWidth: 1,
    margin:10,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 20
  },
  primaryButtonAdd: {
    width: 350,
    height: 55,
    margin: 20,
    marginRight: 10,
    padding: 10,
    backgroundColor: '#529ecc',
    marginTop: 5
  },
  primaryButtonCancel: {
    width: 350,
    height: 55,
    margin: 20,
    marginRight: 10,
    padding: 10,
    backgroundColor: '#ff0000',
    marginTop: 5
  },
  primaryButtonText: {
    width: 100,
    height: 55,
    color: '#FFF',
    fontSize: 24,
    textAlign: 'center'
  },
  appTitle: {
  	fontSize: 25,
  	marginTop:20,
  	marginLeft: 20,
    marginRight: 20,
    textAlign: 'center'
  },
  listTitle: {
  	fontSize: 20,
  	marginLeft: 20,
  	marginBottom: 15
  },
  listItemText: {
  	fontSize: 22,
  	width: 600,
  	marginLeft: 30,
  	marginBottom: 10
  },
  listEditIcon: {
  	width: 25,
  	backgroundColor:"#3b5998",
  	marginRight: 8,
  	marginBottom:10
  },
  listRemoveIcon: {
  	width: 25,
  	backgroundColor:"#ff1a1a",
  	marginLeft: 8,
  	marginBottom:10
  },
  listEmpty: {
    fontSize: 30,
    marginTop: 40,
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('List', () => List);
