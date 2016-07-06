const React = require('react');
const NotebookActions = require('../../actions/notebook_actions');
const hashHistory = require('react-router').hashHistory;

const EditNotebookForm = React.createClass({
  getInitialState(){
    return ({
      title: this.props.title
    });
  },
  changeTitle(e){
    this.setState({
      title: e.target.value
    });
  },
  handleSubmit(e){
    console.log('hit handleSubmit');
    e.preventDefault();
    const notebookData = { title: this.state.title };
    NotebookActions.editNotebook(notebookData);
    // close modal
  },
  render() {
    return (
      <div>
        <form className="new-notebook-form" onSubmit={this.handleSubmit}>
          <input type="text"
                 value={this.state.title}
                 onChange={this.changeTitle}
                 placeholder="Title Your Notebook"
                 className="notebook-title-input"/>
               <input type="submit" className="create-notebook-button" value='Update Notebook'/>
        </form>
      </div>
    );
  }

});

module.exports = EditNotebookForm;
