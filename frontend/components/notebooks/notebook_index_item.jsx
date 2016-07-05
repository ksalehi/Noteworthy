const React = require('react');
const NotebookStore = require('../../stores/notebook_store');
const NotebookActions = require('../../actions/notebook_actions');
const hashHistory = require('react-router').hashHistory;
const timeSince = require('../notes/time_since');

const NotebookIndexItem = React.createClass({
  redirectToNoteIndex(){
    hashHistory.push('/notebooks/' + this.props.notebook.id);
  },
  deleteNotebook(e){
    e.preventDefault();
    // alert('Are you sure you want to delete this notebook?');
    if (this.props.notebook.id) {
      NotebookActions.deleteNotebook(this.props.notebook.id);
    }
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
      <li onClick={this.redirectToNoteIndex} className={"notes-list-item" + klass}>
        {title}
        <br></br>
        <span className="time-since">{timeSince(date)}</span>
        <button onClick={this.deleteNotebook} className="delete-button" value="DELETE"></button>
      </li>
    );
  }
});

module.exports = NotebookIndexItem;
