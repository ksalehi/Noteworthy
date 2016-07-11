const React = require('react');
const NotebookActions = require('../../actions/notebook_actions');

const DeleteNotebookModal = React.createClass({
  deleteNote(){
    NotebookActions.deleteNotebook(this.props.notebook.id, this.props.deleteCB);
  },
  render() {
    const text = `Are you sure you want to delete '${this.props.notebook.title}'?`;
    return (
      <div className="delete-notebook">
        <span className="delete-text">{text}</span>
        <button onClick={this.deleteNote} className="delete-note-button">Yes, delete</button>
        <button onClick={this.props.closeModal} className="cancel-delete-button">Cancel</button>
    </div>
    );
  }

});

module.exports = DeleteNotebookModal;
