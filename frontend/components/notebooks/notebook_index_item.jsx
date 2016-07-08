const React = require('react');
const NotebookStore = require('../../stores/notebook_store');
const NotebookActions = require('../../actions/notebook_actions');
const hashHistory = require('react-router').hashHistory;
const timeSince = require('../notes/time_since');
const Modal = require('react-modal');

const NotebookIndexItem = React.createClass({
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
  deleteNotebook(e){
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
          <button onClick={this.deleteNotebook} className="delete-button" value="DELETE"></button>
        </li>

        <Modal>

        </Modal>
      </div>
    );
  }
});

module.exports = NotebookIndexItem;
