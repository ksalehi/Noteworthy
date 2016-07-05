const React = require('react');
const ReactDOM = require('react-dom');
const ErrorStore = require('../../stores/error_store');
const hashHistory = require('react-router').hashHistory;
const NoteActions = require('../../actions/note_actions');
const NoteStore = require('../../stores/note_store');

const NoteForm = React.createClass({
  getInitialState() {
    return {
      noteId: null,
      title: "",
      body: "",
      errors: []
    };
  },
  componentDidMount() {
    ErrorStore.clearErrors();
    this._onChange();
    this.noteListener = NoteStore.addListener(this._onChange);
    this.errorListener = ErrorStore.addListener(this.handleErrors);
  },
  componentWillReceiveProps(newProps){
    console.log('receiving props');
    if (this.state.title === '') {
      setTimeout(() => {ReactDOM.findDOMNode(this.refs.titleInput).focus();}, 0); // focus on title if empty
    }
    const note = NoteStore.find(newProps.params.noteId);

    if (note) {
      this.setState({
        noteId: note.id,
        title: note.title,
        body: note.body,
        errors: []
      });
    }
    // if (newProps.location.pathname === '/notes') {
    //   setTimeout(()=>{
    //     const latestNote = NoteStore.getLatestNote();
    //     hashHistory.push(`/notes/${latestNote.id}`);
    //   });
    // }

    // if (newProps.location.pathname === `/notebooks`) {
    //   debugger;
    // }
  },
  componentWillUnmount() {
    this.errorListener.remove();
    this.noteListener.remove();
  },
  _onChange(){
    if (this.props.location.pathname === '/notes') {
      const latestNote = NoteStore.getLatestNote();
      hashHistory.push(`/notes/${latestNote.id}`);
    }
    const note = NoteStore.find(this.props.params.noteId);
    if (note) {
      this.setState({
        noteId: note.id,
        title: note.title,
        body: note.body,
        errors: []
      });
    }
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
            <input type="text"
                   ref="titleInput"
                   value={this.state.title}
                   onChange={this.changeTitle}
                   placeholder="Title Your Note"
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
