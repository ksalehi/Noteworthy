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

const NoteIndex = React.createClass({
  getInitialState() {
    return {
      notes: [],
      notebooks: [],
      defaultNotebook: null
     };
  },
  componentDidMount() {
    if (SessionStore.isUserLoggedIn()) {
      NoteActions.fetchNotes(this.props.params.notebookId); //TODO: notebookId not always defined
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
      defaultNotebook: NotebookStore.defaultNotebook()
    });

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
    if (this.props.location.pathname.match('/notes/[^ ]*')) {
      this.currentNotebook = this.state.defaultNotebook; // TODO: replace with default notebook
    } else {
      this.currentNotebook = NotebookStore.find(this.props.params.notebookId);
    }
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
    if (path === `/notebooks/${this.props.params.notebookId}`) {
      this.notebookTitle = NotebookStore.find(this.props.params.notebookId).title;
    } else {
      this.notebookTitle = `user's Notebook`;
    }
    return (
      <div>
        <ul className="notes-list">
          <h2 className="notes-list-header">{this.notebookTitle}
            <div>
              <button className="new-notebook-button" onClick={this.editNotebook}></button>
            </div>
          </h2>
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

        <Modal
          style={NoteConstants.MODAL_STYLE}
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}>
            <EditNotebookForm title={this.notebookTitle}
                              closeModal={this.closeModal} />
        </Modal>
      </div>
    );
  }
});

module.exports = NoteIndex;
