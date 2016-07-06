const React = require('react');
const hashHistory = require('react-router').hashHistory;
const NoteStore = require('../../stores/note_store');
const NoteActions = require('../../actions/note_actions');
const NoteIndexItem = require('./note_index_item');
const SessionStore = require('../../stores/session_store');
const NotebookStore = require('../../stores/notebook_store');
const currentUser = window.currentUser;

const NoteIndex = React.createClass({
  getInitialState() {
    return { notes: [] };
  },
  componentDidMount() {
    if (SessionStore.isUserLoggedIn()) {
      NoteActions.fetchNotes(this.props.params.notebookId);
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

    const latestNote = NoteStore.getLatestNote();
    if (this.props.location.pathname === '/notes') {
      hashHistory.push(`/notes/${latestNote.id}`);
    } else if (this.props.location.pathname === `/notebooks/${this.props.params.notebookId}`) {
      hashHistory.push(`/notebooks/${this.props.params.notebookId}/${latestNote.id}`);
    }
  },
  render(){
    console.log('rendering note index');
    const notes = this.state.notes;
    const path = this.props.location.pathname;
    let notebookTitle;
    if (path === `/notebooks/${this.props.params.notebookId}`) {
      notebookTitle = NotebookStore.find(this.props.params.notebookId);
    } else {
      notebookTitle = `${currentUser.username}'s Notebook`;
    }
    return (
      <div>
        <ul className="notes-list">
          <h2 className="notes-list-header">{notebookTitle}</h2>
          {
            notes.map( note => {
              return (<NoteIndexItem
                key={note.id}
                note={note}
                selected={ path === `/notes/${note.id}` ? true : false }
                updatedAt={note.updated_at}
                pathname={ this.props.location.pathname }
                notebookId={ this.props.params.notebookId }
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
