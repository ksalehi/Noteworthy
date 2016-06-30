const React = require('react');
const ErrorStore = require('../../stores/error_store');
const hashHistory = require('react-router').hashHistory;
const NoteActions = require('../../actions/note_actions');
const NoteStore = require('../../stores/note_store');

const NoteForm = React.createClass({
  getInitialState() {
    console.log('getting initial state');
    console.log(this.props.params);
    const potentialNote = NoteStore.find(this.props.params.noteId);
    return {
      errors: [],
      title: "",
      body: ""
    };
  },
  componentDidMount() {
    this.errorListener = ErrorStore.addListener(this.handleErrors);
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
          <label id="title">Title: </label>
          <input type="text"
                 id="title"
                 value={this.state.title}
                 onChange={this.handleChange("title")}
                 className="title-input"/>
               <label id="body">Body: </label>
          <input type="text"
                 id="body"
                 value={this.state.body}
                 onChange={this.handleChange("body")}
                 className="body-input"/>
        </form>
      </div>
    );
  }
});

module.exports = NoteForm;
