var Reflux = require('reflux');
var ListAction = require('../Actions/ListAction');

export default Reflux.createStore({
  
  data: {
    notes: []
  },

  init: function() {
    // Here we listen to actions and register callbacks
    this.listenTo(ListAction.createNote, this.onCreate);
    this.listenTo(ListAction.updateNote, this.onUpdate);
    this.listenTo(ListAction.removeNote, this.onRemove);
  },

  emitChange() {
    this.trigger(this.data.notes.slice());
  },
  
  load: function() {
    this.emitChange();
  },
  
  onCreate: function(note) {
    this.data.notes.push(note); //create a new note
    // Trigger an event once done so that our components can update. Also pass the modified list of this.data.notes.
    this.emitChange();
  },

  //getter for notes
  getnotes: function() {
    return this.data.notes;
  },

  //getter for finding a single note by id
  getnote: function(id) {
    return this.data.notes[id];  
  },

  onUpdate: function(data){
    this.data.notes[data.id] = data.note;
    this.emitChange();
  },

  onRemove: function(data){
    this.data.notes.splice(data.id, 1);
    this.emitChange();
  }
});