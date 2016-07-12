const React = require('react');
const NoteStore = require('../../stores/note_store');
const NoteActions = require('../../actions/note_actions');
const hashHistory = require('react-router').hashHistory;
const timeSince = require('./time_since');
const Modal = require('react-modal');
const NoteConstants = require('../../constants/note_constants');
const DeleteNoteModal = require('./delete_note_modal');

const NoteIndexItem = React.createClass({
  getInitialState() {
    return {
      modalOpen: false
    };
  },
  showDetail(){
    if (this.props.pathname.match('/notes/[^ ]*')) {
      hashHistory.push('/notes/' + this.props.note.id);
    } else if (this.props.notebook){
      hashHistory.push('/notebooks/' + this.props.notebook.id + '/' + this.props.note.id);
    }
  },
  deleteNote(e){
    e.preventDefault();
    // alert('Are you sure you want to delete this note?');
    if (this.props.note.id) {
      this.openModal();
      // NoteActions.deleteNote(this.props.note.id, this.props.deleteCB);
    }
  },
  closeModal: function(){
    this.setState({ modalOpen: false });
  },
  openModal: function(){
    this.setState({ modalOpen: true });
  },
  openDeleteModal(e){
    e.stopPropagation();
    e.preventDefault();
    this.openModal();
  },
  render(){
    let klass;
    if (this.props.selected) {
      klass = " selected";
    } else {
      klass = "";
    }

    let title;
    if (this.props.note.title === '') {
      title = 'Title Your Note';
    } else {
      title = this.props.note.title;
    }

    const date = new Date(this.props.updatedAt);
    return (
      <div>
        <li onClick={this.showDetail} className={"notes-list-item" + klass}>
          {title}
          <br></br>
          <span className="time-since">{timeSince(date)}</span>
          <button onClick={this.openDeleteModal} className="delete-button" value="DELETE">
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </li>

        <Modal
          style={NoteConstants.MODAL_STYLE}
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}>
            <DeleteNoteModal
              note={this.props.note}
              closeModal={this.closeModal}
              deleteCB={this.props.deleteCB}/>
        </Modal>
      </div>
    );
  }
});

module.exports = NoteIndexItem;
