const React = require('react');
const NoteActions = require('../../actions/note_actions');

const DeleteNoteModal = React.createClass({
  deleteNote(){
    NoteActions.deleteNote(this.props.note.id, this.props.deleteCB);
  },
  render() {
    const text = `Are you sure you want to delete '${this.props.note.title}'?`;
    return (
      <div className="delete-note">
        <span className="delete-text">{text}</span>
        <button onClick={this.deleteNote} className="delete-note-button">Yes, delete</button>
        <button onClick={this.props.closeModal} className="cancel-delete-button">Cancel</button>
    </div>
    );
  }

});

module.exports = DeleteNoteModal;
