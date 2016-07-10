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
      currentNotebook: null
     };
  },
  componentDidMount() {
    if (SessionStore.isUserLoggedIn()) {
      if (this.props.location && this.props.location.pathname.match('/notes/[^ ]*')) {
        NoteActions.fetchNotes();
      } else {
        const notebookData = {notebookId: this.props.params.notebookId};
        NoteActions.fetchNotes(notebookData);
      }
      NotebookActions.fetchNotebooks();
      this.noteListener = NoteStore.addListener(this._onNoteChange);
      this.notebookListener = NotebookStore.addListener(this._onNotebookChange);
    }
  },
  componentWillReceiveProps(nextProps){
    if (SessionStore.isUserLoggedIn()) {
      if (nextProps.location && nextProps.location.pathname.match('/notes/[^ ]*')) {
        NoteActions.fetchNotes();
      } else {
        const notebookData = {notebookId: nextProps.params.notebookId};
        NoteActions.fetchNotes(notebookData);
      }
      NotebookActions.fetchNotebooks();
    }
  },
  componentWillUnmount() {
    this.noteListener.remove();
    this.notebookListener.remove();
  },
  _onNoteChange() {
    this.setState({ notes: NoteStore.all(this.props.params.notebookId) });

    const latestNote = NoteStore.getLatestNote(this.props.params.notebookId);
    if (latestNote) { // won't exist if notebook was just created
      if (this.props.location.pathname === '/notes') {
        hashHistory.push(`/notes/${latestNote.id}`);
      } else if (this.props.location.pathname === `/notebooks/${this.props.params.notebookId}`) {
        hashHistory.push(`/notebooks/${this.props.params.notebookId}/${latestNote.id}`);
      }
    }
  },
  _onNotebookChange() {

    if (this.props.location.pathname.match('/notes/[^ ]*')) {
      // debugger;
      this.currentNotebook = NotebookStore.defaultNotebook();
    } else {
      // debugger;
      this.currentNotebook = NotebookStore.find(this.props.params.notebookId);
    }

    this.setState({
      notebooks: NotebookStore.all(),
      currentNotebook: this.currentNotebook
    });
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
  deleteCB(noteId){
    console.log('hit delete cb');
    const noteIds = Object.keys(this.state.notes).map(noteIndex => {
      return this.state.notes[noteIndex].id;
    });
    const nextNoteIdx = noteIds.indexOf(noteId) + 1;
    const nextNoteIdx2 = noteIds.indexOf(noteId) -1;
    const nextNoteId = (nextNoteIdx2 < 0) ? noteIds[nextNoteIdx] : noteIds[nextNoteIdx2];

    if (nextNoteId) {
      if (this.props.location.pathname.match('/notes/[^ ]*')) {
        hashHistory.push('/notes/' + nextNoteId);
      } else {
        hashHistory.push('/notebooks/' + this.props.params.notebookId + '/' + nextNoteId);
      }
    }

    if (this.props.location.pathname.match('/notes/[^ ]*')) {
      this.currentNotebook = NotebookStore.defaultNotebook();
    } else {
      this.currentNotebook = NotebookStore.find(this.props.params.notebookId);
    }
  },
  render(){
    const notes = this.state.notes;
    const path = this.props.location.pathname;
    let currentNotebookId = -1;
    if (this.currentNotebook) {
      currentNotebookId = this.currentNotebook.id;
    }
    return (
      <div className="note-index-parent">
        <ul className="notes-list">
          <h2 className="notes-list-header">{this.state.currentNotebook ? this.state.currentNotebook.title : ''}
            <div>
              <button onClick={this.editNotebook}>
                <i className="fa fa-info-circle" aria-hidden="true"></i>
              </button>
            </div>
            <NotesSearchBox />
          </h2>
            {
              notes.map( note => {
                let selected = false;
                if (path === `/notes/${note.id}`) {
                  selected = true;
                } else if (this.state.currentNotebook && path === `/notebooks/${this.state.currentNotebook.id}/${note.id}`) {
                  selected = true;
                }

                return (<NoteIndexItem
                  key={note.id}
                  note={note}
                  updatedAt={note.updated_at}
                  pathname={this.props.location.pathname}
                  selected={ selected }
                  notebookId={currentNotebookId}
                  deleteCB={this.deleteCB}
                  />);
                })
              }
        </ul>
        <div className="note-form">
          {this.props.children}
        </div>

        <Modal
          style={NoteConstants.MODAL_STYLE}
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}>
            <EditNotebookForm notebook={this.state.currentNotebook}
                              closeModal={this.closeModal} />
        </Modal>
      </div>
    );
  }
});

module.exports = NoteIndex;
