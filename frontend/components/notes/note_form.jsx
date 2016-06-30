const React = require('react');
const ErrorStore = require('../../stores/error_store');
const hashHistory = require('react-router').hashHistory;
const NoteActions = require('../../actions/note_actions');
const NoteStore = require('../../stores/note_store');

const NoteForm = React.createClass({
  getInitialState() {
    return {
      errors: [],
      title: "",
      body: ""
    };
  },
  componentDidMount() {
    this.errorListener = ErrorStore.addListener(this.handleErrors);
  },
  componentWillReceiveProps(newProps){
    const note = NoteStore.find(newProps.params.noteId);
    if (note) {
      this.setState({
        title: note.title,
        body: note.body
      });
    } else {
      this.setState({
        errors: [],
        title: "",
        body: ""
      });
    }
  },
  componentWillUnmount() {
    this.errorListener.remove();
  },
  handleChange(property) {
    return (e) => this.setState({[property]: e.target.value});
  },
  handleErrors(){
    this.setState({errors: ErrorStore.formErrors("note_form")});
  },
  renderErrors(){
    return this.state.errors.map((error, idx) => {
      return (
        <li key={idx}>{error}</li>
      );
    });
  },
  handleSubmit(e){
    console.log('handleSubmit triggered');
    e.preventDefault();
    const noteData = {
      title: this.state.title,
      body: this.state.body
    };
    NoteActions.createNote(noteData);
    this.setState({ title: "", body: "" });
    hashHistory.push('/notes');
  },
  render(){
    console.log('rendering noteform');
    return (
      <div>
        <ul>{this.renderErrors()}</ul>
        <form className="new-note-form" onSubmit={this.handleSubmit}>
          <input type="submit" className="done-button" value="DONE"/>
          <input type="text"
                 value={this.state.title}
                 onChange={this.handleChange("title")}
                 placeholder="Title your note"
                 className="title-input"/>
          <textarea value={this.state.body}
                    onChange={this.handleChange("body")}
                    placeholder="Drag files here or just start typing..."
                    className="body-input"></textarea>
        </form>
      </div>
    );
  }
});

module.exports = NoteForm;
