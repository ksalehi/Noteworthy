const React = require('react');
const hashHistory = require('react-router').hashHistory;
const NoteStore = require('../../stores/note_store');
const NoteActions = require('../../actions/note_actions');
const NoteIndexItem = require('./note_index_item');

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
  newNote(e){
    e.preventDefault();
    const url = '/notes/new';
    hashHistory.push(url);
  },
  render(){
    const notes = this.state.notes;
    const that = this;
    return (
      <div>
        <ul className="notes-list">
          {
            notes.map( note => {
              return (<NoteIndexItem key={note.id} note={note}/>);
            })
          }
        </ul>
        <button onClick={this.newNote}>New Note</button>
        {this.props.children}
      </div>
    );
  }
});

module.exports = NoteIndex;
