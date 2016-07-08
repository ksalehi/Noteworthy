const React = require('react');

const NotebookIndex = React.createClass({
  render(){
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = NotebookIndex;
