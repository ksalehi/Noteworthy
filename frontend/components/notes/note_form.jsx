const React = require('react');
const ReactDOM = require('react-dom');
const ErrorStore = require('../../stores/error_store');
const hashHistory = require('react-router').hashHistory;
const NoteActions = require('../../actions/note_actions');
const NoteStore = require('../../stores/note_store');

const NoteForm = React.createClass({
  getInitialState() {
    const noteId = this.props.params.noteId;
    const note = NoteStore.find(noteId);
    return {
      noteId: note.id,
      title: note.title,
      body: note.body,
      errors: []
    };
  },
  componentDidMount() {
    console.log('component mounting');
    ReactDOM.findDOMNode(this.refs.titleInput).focus();
    ErrorStore.clearErrors();
    this.errorListener = ErrorStore.addListener(this.handleErrors);
  },
  componentWillReceiveProps(newProps){
    console.log('receiving props');
    const note = NoteStore.find(newProps.params.noteId);
    if (note.title === '') {
      console.log('hitting focus line');
      ReactDOM.findDOMNode(this.refs.titleInput).focus(); // focus on title if empty
    }
    if (note) {
      this.setState({
        noteId: note.id,
        title: note.title,
        body: note.body,
        errors: []
      });
    } else {
      console.log('note doesn\'t exist');
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
        <li className="errors-list" key={idx}>{error}</li>
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
    console.log('hit autosave');
    const noteData = {
      title: this.state.title,
      body: this.state.body
    };
    const note = NoteStore.find(this.state.noteId);
    noteData['id'] = note.id;
    NoteActions.editNote(noteData);
  },
  render(){
    return (
      <div>
        <ul>{this.renderErrors()}</ul>
        <div>
          <form className="new-note-form" onSubmit={this.handleSubmit}>
            <div id="toolbar">
              <button class="ql-bold">Bold</button>
              <button class="ql-italic">Italic</button>
            </div>
            <input type="submit" className="save-button" value="SAVE"/>
            <input type="text"
                   ref="titleInput"
                   value={this.state.title}
                   onChange={this.changeTitle}
                   placeholder="what?"
                   className="title-input"/>
            <textarea value={this.state.body}
                      onChange={this.changeBody}
                      placeholder="Drag files here or just start typing..."
                      className="body-input"></textarea>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = NoteForm;
