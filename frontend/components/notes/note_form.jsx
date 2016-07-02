const React = require('react');
const ErrorStore = require('../../stores/error_store');
const hashHistory = require('react-router').hashHistory;
const NoteActions = require('../../actions/note_actions');
const NoteStore = require('../../stores/note_store');

const NoteForm = React.createClass({
  getInitialState() {
    return {
      noteId: null,
      errors: [],
      title: "",
      body: "",
      update: false,
    };
  },
  componentDidMount() {
    this.errorListener = ErrorStore.addListener(this.handleErrors);
  },
  componentWillReceiveProps(newProps){
    const note = NoteStore.find(newProps.params.noteId);
    if (note) {
      this.setState({
        noteId: note.id,
        title: note.title,
        body: note.body,
        errors: []
      });
    } else {
      this.setState({
        noteId: null,
        errors: [],
        title: "",
        body: ""
      });
    }
  },
  componentWillUnmount() {
    this.errorListener.remove();
  },
  changeTitle(e) {
    this.setState({title: e.target.value});
    setTimeout(()=>{this.autoSave();}, 0);
  },
  changeBody(e) {
    this.setState({body: e.target.value});
    setTimeout(()=>{this.autoSave();}, 0);
  },
  handleErrors(){
    this.setState({errors: ErrorStore.formErrors("note_form")});
  },
  renderErrors(){
    const errors = this.state.errors.map((error, idx) => {
      return (
        <li key={idx}>{error}</li>
      );
    });
    return errors;
  },
  handleSubmit(e){
    e.preventDefault();
    const noteData = {
      title: this.state.title,
      body: this.state.body
    };
    const note = NoteStore.find(this.state.noteId);
    if (note) {
      noteData['id'] = this.state.noteId;
      NoteActions.editNote(noteData);
    } else {
      NoteActions.createNote(noteData);
      // setState({update: true});
    }
  },
  deleteNote(e){
    // currently not being used but might be added
    e.preventDefault();
    // modal ('Are you sure you want to delete this note?');
    if (this.state.noteId) {
      NoteActions.deleteNote(this.state.noteId);
    }
  },
  autoSave() {
    if (this.state.title || this.state.body) {
      console.log('hit autosave');
      const noteData = {
        title: this.state.title,
        body: this.state.body
      };
      const note = NoteStore.find(this.state.noteId);
      if (note) {
        noteData['id'] = note.id;
        NoteActions.editNote(noteData);
      } else {
        NoteActions.createNote(noteData);
        this.new = false;
      }
    }
  },
  render(){
    return (
      <div>
        <ul>{this.renderErrors()}</ul>
        <form className="new-note-form" onSubmit={this.handleSubmit}>
          <input type="submit" className="save-button" value="SAVE"/>
          <input type="text"
                 value={this.state.title}
                 onInput={this.changeTitle}
                 placeholder="Title your note"
                 className="title-input"/>
          <textarea value={this.state.body}
                    onInput={this.changeBody}
                    placeholder="Drag files here or just start typing..."
                    className="body-input"></textarea>
        </form>

      </div>
    );
  }
});

module.exports = NoteForm;
