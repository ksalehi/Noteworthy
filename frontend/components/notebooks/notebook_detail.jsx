const React = require('react');
const NoteStore = require('../../stores/note_store');
const NoteActions = require('../../actions/note_actions');
const NoteIndexItem = require('../../components/notes/note_index_item');
const NoteIndex = require('../../components/notes/note_index');

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

    return (
      <div >
        <NoteIndex />
      </div>
    );
  }
});

module.exports = NotebookDetail;
