import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import CreateButton from '../components/Form/CreateButton';
import CancelButton from '../components/Form/CancelButton';
import ListStore from '../Stores/ListStore';
import ListAction from '../Actions/ListAction';

export default class List extends Component {

	constructor(props) {
		super(props);

		this.state = {
			noteId: '',
      note: ''
		};
	}

  componentDidMount() {
    this.unsubscribe = ListStore.listen((notes)=>{
      this.setState({
        note: '',
        noteId:''
      });    
    }); 

    ListStore.load();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {  

    let cancelBtn;
    
    if ((this.state.note !== '')) {
                              
      cancelBtn = <CancelButton 
          name= {(this.state.noteId === '') ? 'Clear' : 'Cancel'}
          onPress={() => this._handleOnCancel.bind(this)} />                            
    }

    return (

    	<View style={styles.container}>
    		<Text
	        style={styles.appTitle}>
	        Reflux ToDo App
        </Text>
        <TextInput
	        style={styles.textInput}
	        placeholder={"Your note title"}
	        onChangeText={(text) => this.setState({note: text})}
	        value={this.state.note} />
        <View style={{flexDirection: 'row'}}>
          <CreateButton
  	        name={(this.state.noteId !== '') ? 'Update': 'Create'}
            onPress = {() => this._handleOnSave.bind(this)}/>
          {cancelBtn}
        </View>
  		</View>   		
    );
  }

  _handleOnCancel(){
    this.setState({
        note: '',
        noteId: '',
        addBtnStyle: styles.defaultPrimaryButtonAdd
    });
  }

  _handleOnSave(){
    console.log("sadsdasdsadsadsad");
    if (this.state.note !== ''){
      if (this.state.noteId !== ''){
        ListAction.updateNote({
          id : parseInt(this.state.noteId),
          note: this.state.note
        });
        return;
      }
      
      ListAction.createNote(this.state.note);
    }
  }

  editNote(noteId, note){
    this.setState({ 
      noteId,
      note
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textInput: {
    height: 40, 
    borderColor: 'red', 
    borderWidth: 1,
    margin:10,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 23
  },
  appTitle: {
  	fontSize: 28,
  	marginTop:20,
  	marginLeft: 20,
    marginRight: 20,
    textAlign: 'center'
  }
});
