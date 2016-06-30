const React = require('react');
const NotebookStore = require('../../stores/notebook_store');
const NotebookActions = require('../../actions/notebook_actions');

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
    return (
      <div>
        <ul>
          {
            notebooks.map( notebook => {
              return (<li key={notebook.id}>{notebook.title}</li>);
            })
          }
        </ul>
      </div>
    );
  }
});

module.exports = NotebookIndex;
