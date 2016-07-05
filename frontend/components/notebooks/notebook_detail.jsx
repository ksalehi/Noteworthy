const React = require('react');
const NoteStore = require('../../stores/note_store');
const NoteActions = require('../../actions/note_actions');
const NoteForm = require('../../components/notes/note_form');

const NotebookDetail = React.createClass({
  getInitialState() {
    return {
      notes : []
    };
  },
  componentDidMount(){
    NoteActions.fetchNotesByNotebook(this.props.params.notebookId);
    this.listener = NoteStore.addListener(this._onChange);
  },
  componentWillUnmount(){
    this.listener.remove();
  },
  _onChange(){
    this.setState({
      notes: NoteStore.allByNotebook(this.props.params.notebookId)
    });
  },
  render() {
    let notes = this.state.notes;

    console.log('rendering notebook detail');
    return (
      <div >
        {
          notes.map( note => {
            return (
              <li key={note.id}>
                <NoteForm note={note} />
              </li>
            );
          })
        }
      </div>
    );
  }
});

module.exports = NotebookDetail;
