var Reflux = require('reflux');
var ListActions = require('../Actions/ListActions');
// var Firebase = require('firebase');
// var myFirebaseRef;

export default Reflux.createStore({
  
  data: {
    notes: []
  },

  listenables: ListActions,

  init: function() {
  },

  emitChange() {
    this.trigger(this.data.notes.slice());
  },
  
  load: function() {
    this.emitChange();
  },

  showError(error){
    alert(error);
  },

  onCreateNoteCompleted: function(data) {
    this.data.notes.push(data);
    this.emitChange();
  },
  onCreateNoteFailed: function(error) {
    this.showError(error);
    this.emitChange();
  },
  onUpdateNoteCompleted: function(data) {
    this.data.notes[data.id] = data.note;
    this.emitChange();
  },
  onUpdateNoteFailed: function(error) {
    this.showError(error);
    this.emitChange();
  },
  onRemoveNoteCompleted: function(data) {
    this.data.notes.splice(data.id, 1);
    this.emitChange();
  },
  onRemoveNoteFailed: function(error) {
    this.showError(error);
    this.emitChange();
  },

  //getter for notes
  getnotes: function() {
    return this.data.notes;
  },

  //getter for finding a single note by id
  getnote: function(id) {
    return this.data.notes[id];  
  }
});