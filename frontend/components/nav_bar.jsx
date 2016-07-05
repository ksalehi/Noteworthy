const React = require('react');
const NoteActions = require('../actions/note_actions');
const NotebookActions = require('../actions/notebook_actions');
const hashHistory = require('react-router').hashHistory;

const NavBar = React.createClass({
  newNotebookForm(e){
    e.preventDefault();
    hashHistory.push('/notebooks/new');
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
  render: function() {
    return (
      <div>
        <button className="new-note-button" onClick={this.newNote}>+</button>
        <button className="" onClick={this.newNotebookForm}>NB</button>
      </div>
    );
  }

});

module.exports = NavBar;
