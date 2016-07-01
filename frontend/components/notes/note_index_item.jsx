const React = require('react');
const NoteStore = require('../../stores/note_store');
const NoteActions = require('../../actions/note_actions');
const hashHistory = require('react-router').hashHistory;


const NoteIndexItem = React.createClass({
  showDetail(){
    console.log('you clicked!');
    hashHistory.push('/notes/' + this.props.note.id);
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
      </li>
    );
  }
});

module.exports = NoteIndexItem;
