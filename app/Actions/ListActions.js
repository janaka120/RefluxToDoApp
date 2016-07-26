var Reflux = require('reflux');
var Firebase = require('firebase');
var fUrl = 'https://flickering-fire-2129.firebaseio.com/';
var ListActions = Reflux.createActions({
  'createNote': {children: ["completed","failed"]},
  'updateNote': {children: ["completed","failed"]},
  'removeNote': {children: ["completed","failed"]},
});

// when 'createNote' is triggered, call async operation and trigger related actions
ListActions.createNote.listen( function(data) {
    // By default, the listener is bound to the action
    // so we can access child actions using 'this'
    var addfbaseRef = new Firebase(fUrl);
    addfbaseRef.push(data)
		    	.then( (response) => {
			    	var id = String(response).replace(/https\:\/\/flickering\-fire\-2129\.firebaseio\.com\//g, "");   	
			    	data.id = id;
			    	this.completed(data);})
		    	.catch( (error) => { this.failed(error)});
});

ListActions.updateNote.listen( function(data) {
	var updatefRef = new Firebase(fUrl+data.id+'/note');
    updatefRef.update(data, onComplete)
    			.then( (response) => {this.completed(data);})
            	.catch( (error) => { this.failed(error)});
});

ListActions.removeNote.listen(function(data) {
	var deletefRef = new Firebase(fUrl+data.id);
	deletefRef.remove()
		   .then( (response) => {this.completed(data);})
           .catch( (error) => { this.failed(error)});;
});

var onComplete = function(response) {
  if (response) {
    return response;
  }
};

module.exports = ListActions;