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
      saved: 'saved'
    };
  },
  componentDidMount() {
    this.autoSaver = setInterval(this.autoSave, 10000);
    this._onChange();
    this.noteListener = NoteStore.addListener(this._onChange);
  },
  componentWillReceiveProps(newProps){
    if (this.state.noteId) {
      if (NoteStore.noteIds().includes(this.state.noteId)) {
        // TODO: this doesn't keep from autosaving deleted ntoe
        this.autoSave();
      }
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
      });
    }
  },
  componentWillUnmount() {
    console.log('note form unmounting & autosaving');
    clearInterval(this.autoSaver);
    if (NoteStore.noteIds().includes(this.state.noteId)) {
      // only save if the note wasn't just deleted
      this.autoSave();

      console.log('hit autosave from component will unmount');
    }
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
  autoSave() {
    const noteData = {
      title: this.state.title,
      body: this.state.body
    };
    noteData['id'] = this.state.noteId;
    NoteActions.editNote(noteData);
    this.setState({saved: 'saved'});
  },
  updateTagField(e){
    this.setState({newTag: e.target.value});
  },
  createTag(e){
    e.preventDefault();

      console.log('hit autosave from createTag');
      this.autoSave();
      const TagData = {
        tag: this.state.newTag,
        noteId: this.state.noteId
      };
      TagActions.createTag(TagData);
      this.setState({newTag: ""});

  },
  render(){
    console.log('rendering note form');
    return (
      <div>
        <div>
          <form className="new-note-form" onSubmit={this.createTag}>
            <input type="text"
                   ref="titleInput"
                   value={this.state.title}
                   onChange={this.changeTitle}
                   placeholder="Title Your Note"
                   className="title-input"
                   onBlur={this.autoSave}/>
            <div className="existing-tags"> {
               this.state.tags.map( (tag) => {
                 return (<li key={tag.id} className="existing-tag">{tag.tag}</li>);
               })}
           </div>
           <div className="tag-icon-and-text">
              <i className="fa fa-tag" aria-hidden="true"></i>
              <input type="text"
                     className="tag-input"
                     onChange={this.updateTagField}
                     placeholder="New tag..."
                     value={this.state.newTag}/>
                   <button type="hidden" />
            </div>
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
