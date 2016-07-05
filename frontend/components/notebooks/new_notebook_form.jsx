var React = require('react');
var PropTypes = React.PropTypes;

var NewNotebookForm = React.createClass({
  getInitialState(){
    return ({
      title: "",
      description: ""
    });
  },
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} value='Create Notebook'>
          <input type="text"
                 ref="titleInput"
                 value={this.state.title}
                 onChange={this.changeTitle}
                 placeholder="Title Your Note"
                 className="title-input"/>
        </form>
      </div>
    );
  }

});

module.exports = NewNotebookForm;
