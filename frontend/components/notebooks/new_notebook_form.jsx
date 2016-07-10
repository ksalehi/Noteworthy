const React = require('react');
const ReactDOM = require('react-dom');
const NotebookActions = require('../../actions/notebook_actions');
const hashHistory = require('react-router').hashHistory;

const NewNotebookForm = React.createClass({
  getInitialState(){
    return ({
      title: ""
    });
  },
  componentDidMount() {
    console.log('component did mount');
    if (this.state.title === '') {
      setTimeout(() => {ReactDOM.findDOMNode(this.refs.titleInput).focus();}, 0);
    }
  },
  changeTitle(e){
    this.setState({
      title: e.target.value
    });
    if (this.state.title !== '') {
      document.getElementById("create-notebook-button").disabled = false;
    }
  },
  handleSubmit(e){
    e.preventDefault();
    const notebookData = { title: this.state.title };
    this.props.toggleShowing(); // close the notebook drawer
    this.props.closeModal();
    NotebookActions.createNotebook(notebookData, this.notebookCB);
  },
  notebookCB(notebookData) {
    hashHistory.push(`/notebooks/${notebookData.id}`);
  },
  toggleDisabled(){
    if (this.state.title === '') {
      return 'disabled';
    } else {
      return 'enabled';
    }
  },
  render() {
    // let klass;
    // if (this.state.title === '') {
    //   klass = 'grayed-out';
    //   document.getElementById("create-notebook-button").disabled = true;
    // } else {
    //   klass = '';
    // }
    return (
      <div>
        <form className="new-notebook-form" onSubmit={this.handleSubmit}>
          <input type="text"
                 value={this.state.title}
                 onChange={this.changeTitle}
                 placeholder="Title Your Notebook"
                 ref='titleInput'
                 className="notebook-title-input"/>
          <input type="submit"
                 id="create-notebook-button"
                 className="create-notebook-button"
                 value='Create Notebook'
                 disabled/>
        </form>
      </div>
    );
  }

});

module.exports = NewNotebookForm;
