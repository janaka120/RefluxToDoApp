import React, { Component } from 'react';
import { AppRegistry, View, TextInput, StyleSheet, Text, ListView, TouchableOpacity, Alert } from 'react-native';
import ListStore from '../Stores/ListStore';
import ListAction from '../Actions/ListActions';
import DeleteButton from '../components/List/DeleteButton';
import EditButton from '../components/List/EditButton';
// var createFragment = require('react-addons-create-fragment');

export default class List extends Component {

	constructor(props) {
		super(props);

		this.state = {
      length:0,
			notes: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
		};
	}

	componentDidMount() {
    this.unsubscribe = ListStore.listen((notes)=>{

      var notesArray=notes.map((noteObj) => {
              return {
                id: noteObj.id,
                note: noteObj.note
              }
            });
      this.setState({
          length: notes.length,
          notes: this.state.notes.cloneWithRows(notesArray)
        });  
    }); 

    ListStore.load();
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	renderRow(noteObj){
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{noteObj.note}</Text>
        <EditButton onPress={this._handleOnEdit.bind(this,noteObj.id)} />
        <DeleteButton onPress={this._handleOnRemove.bind(this,noteObj.id)} />
      </View>
    );
	}

  _handleOnEdit(noteId){
    this.props.onEditNote(ListStore.getnote(noteId));
  }

  _handleOnRemove(noteId){
    ListAction.removeNote({
      id : noteId
    });
  }

  render() {
    if (this.state.length > 0) {
                    
      listContent = <ListView
                      dataSource={this.state.notes}
                      renderRow={this.renderRow.bind(this)}>
                    </ListView>               
    } else{
      listContent = <Text style={styles.listEmpty}>You don't have any Notes.</Text>
    }

    return (
      <View>
       {listContent}  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  text: {
  	fontSize: 24,
  	flex: 15,
  	marginLeft: 30,
  	marginBottom: 10
  },
  listEmpty: {
    fontSize: 30,
    marginTop: 40,
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('List', () => List);
