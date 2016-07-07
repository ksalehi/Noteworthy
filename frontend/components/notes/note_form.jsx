const React = require('react');
const ReactDOM = require('react-dom');
const ErrorStore = require('../../stores/error_store');
const hashHistory = require('react-router').hashHistory;
const NoteActions = require('../../actions/note_actions');
const NoteStore = require('../../stores/note_store');
const ReactQuill = require('react-quill');
const TagActions = require('../../actions/tag_actions');

const NoteForm = React.createClass({
  getInitialState() {
    return {
      noteId: null,
      title: "",
      body: "",
      tags: [],
      newTag: "",
      errors: [],
      saved: 'saved'
    };
  },
  componentDidMount() {
    this.autoSaver = setInterval(this.autoSave, 10000);
    ErrorStore.clearErrors();
    this._onChange();
    this.noteListener = NoteStore.addListener(this._onChange);
    this.errorListener = ErrorStore.addListener(this.handleErrors);
  },
  componentWillReceiveProps(newProps){
    if (this.state.noteId) {
      this.autoSave();
    }
    let title;
    if (newProps.params && newProps.params.noteId) {
      title = NoteStore.find(newProps.params.noteId).title;
    }

    if (title === '') {
      setTimeout(() => {ReactDOM.findDOMNode(this.refs.titleInput).focus();}, 0); // focus on title if empty
    }
    const note = NoteStore.find(newProps.params.noteId);

    if (note) {
      this.setState({
        noteId: note.id,
        title: note.title,
        body: note.body,
        tags: note.tags,
        errors: []
      });
    }
  },
  componentWillUnmount() {
    clearInterval(this.autoSaver);
    this.autoSave();
    this.errorListener.remove();
    this.noteListener.remove();
  },
  _onChange(){
    const latestNote = NoteStore.getLatestNote();
    if (this.props.location.pathname === '/notes' && latestNote) {
      hashHistory.push(`/notes/${latestNote.id}`);
    }
    const note = NoteStore.find(this.props.params.noteId);
    if (note) {
      this.setState({
        noteId: note.id,
        title: note.title,
        body: note.body,
        tags: note.tags,
        errors: []
      });
    }
  },
  changeTitle(e) {
    this.setState({
      title: e.target.value,
      saved: 'unsaved'
    });
  },
  changeBody(e) {
    this.setState({
      body: e,
      saved: 'unsaved'
    });
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
  autoSave() {
    const noteData = {
      title: this.state.title,
      body: this.state.body
    };
    const note = NoteStore.find(this.state.noteId);
    noteData['id'] = note.id;
    NoteActions.editNote(noteData);
    this.setState({saved: 'saved'});
  },
  updateTagField(e){
    this.setState({newTag: this.state.newTag+e.key});
  },
  createTag(e){
    e.preventDefault();
    if (e.key === "Enter" || e.key === "Tab") {

      this.autoSave();
      const TagData = {
        tag: this.state.newTag,
        noteId: this.state.noteId
      };
      TagActions.createTag(TagData);
      this.setState({newTag: ""});
    } else {
      this.updateTagField(e);
    }
  },
  render(){
    return (
      <div className="note-form">
        <ul>{this.renderErrors()}</ul>
        <div>
          <form className="new-note-form">
            <input type="text"
                   ref="titleInput"
                   value={this.state.title}
                   onChange={this.changeTitle}
                   placeholder="Title Your Note"
                   className="title-input"
                   onBlur={this.autoSave}/>
                 <div> { this.state.tags.map((tag)=>{
                 return (<li>{tag.tag}</li>);
               })}
             </div>
            <input type="text"
                   className="tag-input"
                   onKeyPress={this.createTag}
                   placeholder="New tag..."
                   value={this.state.newTag}/>
            <ReactQuill
                   theme="snow"
                   value={this.state.body}
                   onChange={this.changeBody}
                   placeholder="Drag files here or just start typing..."
                   className="body-input"/>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = NoteForm;
