const React = require('react');
const hashHistory = require('react-router').hashHistory;
const NoteStore = require('../../stores/note_store');
const NoteActions = require('../../actions/note_actions');
const NoteIndexItem = require('./note_index_item');
const SessionStore = require('../../stores/session_store');
const NotebookStore = require('../../stores/notebook_store');
const currentUser = window.currentUser;
const NotebookActions = require('../../actions/notebook_actions');
const Modal = require('react-modal');
const NoteConstants = require('../../constants/note_constants');
const EditNotebookForm = require('../notebooks/edit_notebook_form');
const NotesSearchBox = require('./notes_search_box');

const NoteIndex = React.createClass({
  getInitialState() {
    return {
      notes: [],
      notebooks: [],
     };
  },
  componentDidMount() {
    if (SessionStore.isUserLoggedIn()) {
      console.log(this.props.params.notebookId);
      NoteActions.fetchNotes(this.props.params.notebookId); //TODO: notebookId not always defined
      NotebookActions.fetchNotebooks();
      this.noteListener = NoteStore.addListener(this._onChange);
      this.notebookListener = NotebookStore.addListener(this._onChange);
    }
  },
  componentWillUnmount() {
    this.noteListener.remove();
    this.notebookListener.remove();
  },
  _onChange() {
    this.setState({
      notes: NoteStore.all(),
      notebooks: NotebookStore.all(),
    });

    if (this.props.location.pathname.match('/notes/[^ ]*')) {
      this.currentNotebook = NotebookStore.defaultNotebook();
    } else {
      this.currentNotebook = NotebookStore.find(this.props.params.notebookId);
    }

    const latestNote = NoteStore.getLatestNote();
    if (latestNote) { // won't exist if notebook was just created
      if (this.props.location.pathname === '/notes') {
        hashHistory.push(`/notes/${latestNote.id}`);
      } else if (this.props.location.pathname === `/notebooks/${this.props.params.notebookId}`) {
        hashHistory.push(`/notebooks/${this.props.params.notebookId}/${latestNote.id}`);
      }
    }
  },
  editNotebook(e) {
    e.preventDefault();
    this.openModal();
  },
  closeModal: function(){
    this.setState({ modalOpen: false });
  },
  openModal: function(){
    this.setState({ modalOpen: true });
  },
  render(){
    const notes = this.state.notes;
    const path = this.props.location.pathname;
    return (
      <div>
        <ul className="notes-list">
          <h2 className="notes-list-header">{this.currentNotebook ? this.currentNotebook.title : ''}
            <div>
              <button className="new-notebook-button" onClick={this.editNotebook}></button>
            </div>
            <NotesSearchBox />
          </h2>
            {
              notes.map( note => {
                return (<NoteIndexItem
                  key={note.id}
                  note={note}
                  selected={ path === (`/notes/${note.id}` || `/notebooks/${this.currentNotebook.id}`) ? true : false }
                  updatedAt={note.updated_at}
                  pathname={this.props.location.pathname}
                  notebookId={this.currentNotebook.id}
                  />);
                })
              }
        </ul>
        {this.props.children}

        <Modal
          style={NoteConstants.MODAL_STYLE}
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}>
            <EditNotebookForm notebook={this.currentNotebook}
                              closeModal={this.closeModal} />
        </Modal>
      </div>
    );
  }
});

module.exports = NoteIndex;
