const React = require('react');
const NoteActions = require('../../actions/note_actions');

const NotesSearchBox = React.createClass({
  getInitialState: function() {
    return {
      searchText: ""
    };
  },
  _onInput(e) {
    this.setState({ searchText: e.target.value });
    NoteActions.fetchNotes({
      query: e.target.value,
      notebookId: this.props.notebookId
    });
  },
  render: function() {
    return (
        <input type="text"
               className="search-box"
               onInput={this._onInput}
               value={this.state.searchText}
               placeholder="Search Notes"/>
    );
  }
});

module.exports = NotesSearchBox;
