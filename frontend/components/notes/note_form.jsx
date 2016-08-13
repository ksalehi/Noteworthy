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
      saved: 'All changes saved',
      autoSaving: false
    };
  },
  componentDidMount() {
    this._onChange();
    this.noteListener = NoteStore.addListener(this._onChange);
  },
  componentWillReceiveProps(newProps){
    if (this.state.noteId) {
      if (NoteStore.noteIds().includes(this.state.noteId)) {
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
        tags: note.tags
      });
    }
  },
  componentWillUnmount() {
    if (NoteStore.noteIds().includes(this.state.noteId)) {
      // only save if the note wasn't just deleted
      this.autoSave();
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
      saved: 'Unsaved changes'
    });
  },
  changeBody(e) {
    this.setState({
      body: e,
      saved: 'Unsaved changes'
    });
    if (!this.autoSaving) {
      setTimeout(this.autoSave, 5000);
      this.autoSaving = true;
    }
  },
  autoSave() {
    const noteData = {
      title: this.state.title,
      body: this.state.body,
      id: this.state.noteId
    };
    NoteActions.editNote(noteData);
    this.setState({
      saved: 'All changes saved'});
    this.autoSaving = false;
  },
  updateTagField(e){
    this.setState({newTag: e.target.value});
  },
  createTag(e){
    e.preventDefault();
    this.autoSave();
    const TagData = {
      tag: this.state.newTag,
      noteId: this.state.noteId
    };
    TagActions.createTag(TagData);
    this.setState({newTag: ""});
  },
  deleteTag(tagId) {
    const tagData = {
      tagId: tagId,
      noteId: this.state.noteId
    };
    TagActions.deleteTag(tagData);
  },
  render(){
    return (
      <div>
        <div>
          <form className="new-note-form" onSubmit={this.createTag}>
            <div className="saved-changes">
              {this.state.saved}
            </div>
            <input type="text"
                   ref="titleInput"
                   value={this.state.title}
                   onChange={this.changeTitle}
                   placeholder="Title Your Note"
                   className="title-input"
                   onBlur={this.autoSave}/>
            <div className="existing-tags"> {
               this.state.tags.map( (tag) => {
                 return (<li
                   key={tag.id}
                   className="existing-tag"
                   onClick={this.deleteTag.bind(this, tag.id)}>{tag.tag}
                   <i class="fa fa-times" aria-hidden="true"></i>
                   </li>);
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
                   placeholder="Type your note here..."
                   className="body-input"/>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = NoteForm;
