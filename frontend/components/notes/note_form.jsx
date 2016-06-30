const React = require('react');
const ErrorStore = require('../../stores/error_store');

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
  render(){
    console.log('rendering noteform');
    return (
      <div>
        <ul>{this.renderErrors()}</ul>
        <form onSubmit={this.handleSubmit}>
          <label id="title">Title: </label>
          <input type="text"
                 id="title"
                 value={this.state.title}
                 onChange={this.handleChange("title")}/>
               <label id="body">Body: </label>
          <input type="text"
                 id="body"
                 value={this.state.body}
                 onChange={this.handleChange("body")}/>
          <input type="submit" value="Done"/>
        </form>
      </div>
    );
  }
});

module.exports = NoteForm;
