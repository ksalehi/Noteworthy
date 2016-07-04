const React = require('react');
const hashHistory = require('react-router').hashHistory;
const NoteStore = require('../../stores/note_store');
const NoteActions = require('../../actions/note_actions');
const NoteIndexItem = require('./note_index_item');
const SessionActions = require('../../actions/session_actions');
const SessionStore = require('../../stores/session_store');

const NoteIndex = React.createClass({
  getInitialState() {
    return { notes: [] };
  },
  componentDidMount() {
    if (SessionStore.isUserLoggedIn()) {
      NoteActions.fetchNotes();
      this.noteListener = NoteStore.addListener(this._onChange);
    }
  },
  componentWillUnmount() {
    this.noteListener.remove();
  },
  _onChange() {
    this.setState({
      notes: NoteStore.all()
    });
  },
  noteCB(note) {
    console.log('in callback');
    const url = `/notes/${note.id}`;
    hashHistory.push(url);
  },
  newNote(e){
    e.preventDefault();
    const noteData = {
      title: "Title Your Note",
      body: ""
    };
    NoteActions.createNote(noteData, this.noteCB);
  },
  logOut(e){
    e.preventDefault();
    SessionActions.logOut();
  },
  render(){
    const notes = this.state.notes;
    const that = this;
    const path = this.props.location.pathname;
    return (
      <div>
        <button className="new-note-button" onClick={this.newNote}>+</button>
        <button className="logout-button" onClick={this.logOut}>LOGOUT</button>
        <ul className="notes-list">
          <h2 className="notes-list-header">Notes</h2>
          {
            notes.map( note => {
              return (<NoteIndexItem
                key={note.id}
                note={note}
                selected={ path === `/notes/${note.id}` ? true : false }
                updatedAt={note.updated_at}
                />);
              })
            }
        </ul>
        {this.props.children}
      </div>
    );
  }
});

module.exports = NoteIndex;
