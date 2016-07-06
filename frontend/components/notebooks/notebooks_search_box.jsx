const React = require('react');
const NotebookActions = require('../../actions/notebook_actions');

const NotebooksSearchBox = React.createClass({
  getInitialState: function() {
    return {
      searchText: ""
    };
  },
  _onInput(e) {
    this.setState({ searchText: e.target.value });
    NotebookActions.fetchNotebooks({ query: e.target.value });
  },
  render: function() {
    return (
        <input type="text"
               className="search-box"
               onInput={this._onInput}
               value={this.state.searchText}
               placeholder="Search Notebooks"/>
    );
  }

});

module.exports = NotebooksSearchBox;
