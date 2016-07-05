const React = require('react');
const NotebookStore = require('../../stores/notebook_store');
const NotebookActions = require('../../actions/notebook_actions');
const NotebookIndexItem = require('./notebook_index_item');

const NotebookIndex = React.createClass({
  getInitialState() {
    return { notebooks: NotebookStore.all() };
  },
  componentDidMount() {
    NotebookActions.fetchNotebooks();
    this.notebookListener = NotebookStore.addListener(this._onChange);
  },
  componentWillUnmount() {
    this.notebookListener.remove();
  },
  _onChange() {
    this.setState({ notebooks: NotebookStore.all() });
  },
  render(){
    const notebooks = this.state.notebooks;
    const path = this.props.location.pathname;

    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = NotebookIndex;
