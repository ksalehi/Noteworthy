const React = require('react');
const NoteStore = require('../../stores/note_store');
const NoteActions = require('../../actions/note_actions');
const hashHistory = require('react-router').hashHistory;
const timeSince = require('./time_since');

const NoteIndexItem = React.createClass({
  showDetail(){
    if (this.props.pathname.match('/notes/[^ ]*')) {
      hashHistory.push('/notes/' + this.props.note.id);
    } else if (this.props.notebookId !== -1){
      hashHistory.push('/notebooks/' + this.props.notebookId + '/' + this.props.note.id);
    }
  },
  deleteNote(e){
    e.preventDefault();
    // alert('Are you sure you want to delete this note?');
    if (this.props.note.id) {
      console.log('clicked delete');
      NoteActions.deleteNote(this.props.note.id);
      this.props.deleteCB(this.props.note.id);
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
    if (this.props.note.title === '') {
      title = 'Title Your Note';
    } else {
      title = this.props.note.title;
    }

    const date = new Date(this.props.updatedAt);
    return (
      <li onClick={this.showDetail} className={"notes-list-item" + klass}>
        {title}
        <br></br>
        <span className="time-since">{timeSince(date)}</span>
        <button onClick={this.deleteNote} className="delete-button" value="DELETE">
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
      </li>
    );
  }
});

module.exports = NoteIndexItem;
