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
    this.props.toggleShowing();
  },
  newNote(e){
    e.preventDefault();

    const matched = this.props.path.match(/\/notebooks\/(\d+)/);
    debugger;
    const notebookId = matched[1];
    const noteData = {
      title: "",
      body: "",
      notebook_id: notebookId
    };
    NoteActions.createNote(noteData, this.noteCB);
  },
  noteCB(note) {
    let url;
    if (this.props.path.match('/notes/[^ ]*')) {
      url = `/notes/${note.id}`;
    } else {
      const matched = this.props.path.match(/\/notebooks\/(\d+)\/\d+/);
      if (matched) {
        const notebookId = matched[1];
        url = `/notebooks/${notebookId}/${note.id}`;
      } else { // we're trying to make a new note from /notebooks
        // give new note button negative affordance
        // or would be nice if we could navigate to default notebook...
      }
    }
    if (url) {
      hashHistory.push(url);
    }
  },
  logOut(e){
    e.preventDefault();
    SessionActions.logOut();
  },
  render: function() {
    return (
      <div className="nav-bar">
        <button className="new-note-button" onClick={this.newNote}>
          <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
        <button className="notebooks-button" onClick={this.notebookIndex}>
          <i className="fa fa-book" aria-hidden="true"></i>
        </button>
        <button className="logout-button" onClick={this.logOut}>
          <i className="fa fa-power-off" aria-hidden="true"></i>
        </button>
    </div>
    );
  }

});

module.exports = NavBar;
