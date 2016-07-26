var Reflux = require('reflux');
var ListActions = require('../Actions/ListActions');

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

  showMessage(msg){
    alert(msg);
  },

  onCreateNoteCompleted: function(data) {
    this.data.notes.push(data);
    this.showMessage("Sucessfully create note.");
    this.emitChange();
  },
  onCreateNoteFailed: function(error) {
    this.showMessage(error);
    this.emitChange();
  },
  onUpdateNoteCompleted: function(data) {

    this.data.notes.forEach( (noteObj) => {
      if (noteObj.id == data.id){
        noteObj.note = data.note;
        this.showMessage("Sucessfully update note.");
        this.emitChange();
        return;
      }
    });
  },

  onUpdateNoteFailed: function(error) {
    this.showMessage(error);
    this.emitChange();
  },

  onRemoveNoteCompleted: function(data) {
    this.data.notes.forEach((noteObj => {
      if (noteObj.id == data.id){
        this.data.notes.splice(data.id, 1);
        this.showMessage("Sucessfully remove note.");
        this.emitChange();
        return;
      }
    }));
  },

  onRemoveNoteFailed: function(error) {
    this.showMessage(error);
    this.emitChange();
  },

  getnotes: function() {
    return this.data.notes;
  },

  getnote: function(id) {
    let note = {};
    this.data.notes.forEach((noteObj) => {
      if (noteObj.id == id) {
        note = noteObj;
        return note;
      }
    });
    return note;
  }
});