const React = require('react');
// const SessionActions = require('../actions/session_actions.js');
// const hashHistory = require('react-router').hashHistory;
const NoteStore = require('../../stores/note_store');
const NoteActions = require('../../actions/note_actions');

const NoteIndex = React.createClass({
  getInitialState() {
    return { notes: NoteStore.all() };
  },
  componentDidMount() {
    NoteActions.fetchNotes();
    this.noteListener = NoteStore.addListener(this._onChange);
  },
  componentWillUnmount() {
    this.noteListener.remove();
  },
  _onChange() {
    this.setState({ notes: NoteStore.all() });
  },
  render(){
    const notes = this.state.notes;
    console.log(notes);
    return (
      <div>
        <ul>
          {
            notes.map( note => {
              return (<li>{note.title}</li>);
            })
          }
        </ul>
      </div>
    );
  }
});

module.exports = NoteIndex;
