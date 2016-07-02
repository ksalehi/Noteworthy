const React = require('react');
const NoteStore = require('../../stores/note_store');
const NoteActions = require('../../actions/note_actions');
const hashHistory = require('react-router').hashHistory;

const NoteIndexItem = React.createClass({
  showDetail(){
    hashHistory.push('/notes/' + this.props.note.id);
  },
  deleteNote(e){
    e.preventDefault();
    // alert('Are you sure you want to delete this note?');
    if (this.props.note.id) {
      NoteActions.deleteNote(this.props.note.id);
    }
  },
  render(){
    let klass;
    if (this.props.selected) {
      klass = " selected";
    } else {
      klass = "";
    }
    return (
      <li onClick={this.showDetail} className={"notes-list-item" + klass}>
        {this.props.note.title}
        <button onClick={this.deleteNote} className="delete-button" value="DELETE"></button>
      </li>
    );
  }
});

module.exports = NoteIndexItem;
