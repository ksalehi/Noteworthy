const React = require('react');
const NoteActions = require('../actions/note_actions');
const NotebookActions = require('../actions/notebook_actions');
const hashHistory = require('react-router').hashHistory;
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');

const NavBar = React.createClass({
  getInitialState() {
    return {
      loggedIn: true
    };
  },
  componentDidMount(){
    this.sessionListener = SessionStore.addListener(this._handleRedirect);
  },
  componentWillUnmount(){
    this.sessionListener.remove();
  },
  _handleRedirect(){
    if (!SessionStore.isUserLoggedIn()) {
      if (this.state.loggedIn) {
        hashHistory.push('/');
      }
    }
  },
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
    let url;
    // if (this.props.params.location.match('/notes/[^ ]*')) {
      url = `/notes/${note.id}`;
    // } else {
    //   url = `/notebooks/${this.props.params.notebookId}/${note.id}`;
    // }
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
