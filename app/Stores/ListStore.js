var Reflux = require('reflux');
var ListAction = require('../Actions/ListAction');

var notes = []; //This is private note array


export default Reflux.createStore({
  
  init: function() {
    // Here we listen to actions and register callbacks
    this.listenTo(ListAction.createNote, this.onCreate);
    this.listenTo(ListAction.updateNote, this.onUpdate);
    this.listenTo(ListAction.removeNote, this.onRemove);
  },
  onCreate: function(note) {
    notes.push(note); //create a new note
    // Trigger an event once done so that our components can update. Also pass the modified list of notes.
    this.trigger(notes);
  },

  //getter for notes
  getnotes: function() {
    return notes;
  },

  //getter for finding a single note by id
  getnote: function(id) {
    for (var i = 0; i < notes.length; i++) {
      if(notes[i]._id === id) {
        return notes[i];
      }
    }    
  },

  onUpdate: function(data){
    for (var i = notes.length - 1; i >= 0; i--) {
      if(data.id === i){
        notes[i] = data.note;
        this.trigger(notes);
        break;
      }
    }
  },

  onRemove: function(data){
    for (var i = notes.length - 1; i >= 0; i--) {
      if(data.id === i){
        notes.splice(i, 1);
        this.trigger(notes);
        break;
      }
    }
  }
});

// module.exports = ListStore; //Finally, export the Store