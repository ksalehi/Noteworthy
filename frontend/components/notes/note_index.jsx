const React = require('react');
const hashHistory = require('react-router').hashHistory;
const NoteStore = require('../../stores/note_store');
const NoteActions = require('../../actions/note_actions');
const NoteIndexItem = require('./note_index_item');
const SessionStore = require('../../stores/session_store');
const NavBar = require('../nav_bar');

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

    if (this.props.location.pathname === '/notes') {
      const latestNote = NoteStore.getLatestNote();
      hashHistory.push(`/notes/${latestNote.id}`);
    }
  },
  render(){
    const notes = this.state.notes;
    const path = this.props.location.pathname;
    return (
      <div>
        <NavBar />
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
