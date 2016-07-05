const React = require('react');
const hashHistory = require('react-router').hashHistory;
const NoteStore = require('../../stores/note_store');
const NoteActions = require('../../actions/note_actions');
const NoteIndexItem = require('./note_index_item');
const SessionStore = require('../../stores/session_store');
const NavBar = require('../nav_bar');

const NoteIndexByNotebook = React.createClass({
  getInitialState() {
    return { notes: [] };
  },
  componentDidMount() {
    if (SessionStore.isUserLoggedIn()) {
      NoteActions.fetchNotesByNotebook(this.props.params.notebookId);
      this.noteListener = NoteStore.addListener(this._onChange);
    }
  },
  componentWillUnmount() {
    this.noteListener.remove();
  },
  _onChange() {
    this.setState({
      notes: NoteStore.allByNotebook()
    });
  },
  render(){
    const notes = this.state.notes;
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

module.exports = NoteIndexByNotebook;
