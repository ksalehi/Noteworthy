const React = require('react');
const NoteActions = require('../actions/note_actions');
const NotebookActions = require('../actions/notebook_actions');
const hashHistory = require('react-router').hashHistory;
const SessionActions = require('../actions/session_actions');

const NavBar = React.createClass({
  notebookIndex(e){
    e.preventDefault();
    hashHistory.push('/notebooks');
  },
  newNote(e){
    e.preventDefault();
    const noteData = {
      title: "",
      body: ""
    };
    NoteActions.createNote(noteData, this.noteCB);
  },
  noteCB(note) {
    const url = `/notes/${note.id}`;
    hashHistory.push(url);
  },
  logOut(e){
    e.preventDefault();
    SessionActions.logOut();
  },
  render: function() {
    return (
      <div className="nav-bar">
        <button className="new-note-button" onClick={this.newNote}>+</button>
        <button className="notebooks-button" onClick={this.notebookIndex}></button>
        <button className="logout-button" onClick={this.logOut}>X</button>
    </div>
    );
  }

});

module.exports = NavBar;
