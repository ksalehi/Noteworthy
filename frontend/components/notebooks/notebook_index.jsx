const React = require('react');
const NotebookStore = require('../../stores/notebook_store');
const NotebookActions = require('../../actions/notebook_actions');
const NotebookIndexItem = require('./notebook_index_item');
const Modal = require('react-modal');
const NoteConstants = require('../../constants/note_constants');
const NewNotebookForm = require('./new_notebook_form');

const NotebookIndex = React.createClass({
  getInitialState() {
    return {
      notebooks: NotebookStore.all(),
      modalOpen: false
    };
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
  newNotebook(e) {
    e.preventDefault();
    this.openModal();
  },
  closeModal: function(){
    this.setState({ modalOpen: false });
  },
  openModal: function(){
    this.setState({ modalOpen: true });
  },
  render(){
    const notebooks = this.state.notebooks;
    const path = this.props.location.pathname;
    const style = NoteConstants.MODAL_STYLE;
    if (path === '/notebooks') {
      return (
        <div>
          <ul className="notes-list">
              <h2 className="notes-list-header">
                Notebooks
                <div>
                  <button className="new-notebook-button" onClick={this.newNotebook}></button>
                </div>
              </h2>
            {
              notebooks.map( notebook => {
                return (<NotebookIndexItem
                  key={notebook.id}
                  notebook={notebook}
                  selected={ path === `/notebooks/${notebook.id}` ? true : false }
                  updatedAt={notebook.updated_at}
                  />);
                })
              }
          </ul>

          <Modal
            style={style}
            isOpen={this.state.modalOpen}
            onRequestClose={this.closeModal}>
              <NewNotebookForm closeModal={this.closeModal} />
          </Modal>

        </div>
      );
    } else {
      return (
        <div>
          {this.props.children}
        </div>
      );
    }
  }
});

module.exports = NotebookIndex;
