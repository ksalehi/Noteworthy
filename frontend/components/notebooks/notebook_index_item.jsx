const React = require('react');
const NotebookStore = require('../../stores/notebook_store');
const NotebookActions = require('../../actions/notebook_actions');
const hashHistory = require('react-router').hashHistory;
const timeSince = require('../notes/time_since');
const Modal = require('react-modal');
const NoteConstants = require('../../constants/note_constants');
const DeleteNotebookModal = require('./delete_notebook_modal');

const NotebookIndexItem = React.createClass({
  getInitialState: function() {
    return {
      modalOpen: false
    };
  },
  redirectToNoteIndex(){
    hashHistory.push('/notebooks/' + this.props.notebook.id);
    this.props.toggleShowing();
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
    if (this.props.notebook.title === '') {
      title = 'Title Your Notebook';
    } else {
      title = this.props.notebook.title;
    }

    const date = new Date(this.props.updatedAt);
    return (
      <div>
        <li onClick={this.redirectToNoteIndex} className={"notes-list-item" + klass}>
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
          <DeleteNotebookModal
            notebook={this.props.notebook}
            deleteCB={this.props.deleteCB}
            closeModal={this.closeModal} />
        </Modal>
      </div>
    );
  }
});

module.exports = NotebookIndexItem;
