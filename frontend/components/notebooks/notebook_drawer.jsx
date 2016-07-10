const React = require('react');
const NotebookStore = require('../../stores/notebook_store');
const NotebookActions = require('../../actions/notebook_actions');
const NotebookIndexItem = require('./notebook_index_item');
const Modal = require('react-modal');
const NoteConstants = require('../../constants/note_constants');
const NewNotebookForm = require('./new_notebook_form');
const NotebooksSearchBox = require('./notebooks_search_box');

const NotebookDrawer = React.createClass({
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
    // TODO: autofocus cursor in modal input field
  },
  closeModal: function(){
    this.setState({ modalOpen: false });
  },
  openModal: function(){
    this.setState({ modalOpen: true });
  },
  render: function() {
    const notebooks = this.state.notebooks;
    const style = NoteConstants.MODAL_STYLE;

    return (
      <div className={this.props.showing ? "show-notebooks-menu" : "hide-notebooks-menu"}>
        <ul className="notebooks-list">
            <h2 className="notes-list-header">
              Notebooks
              <div>
                <button className="new-notebook-button" onClick={this.newNotebook}></button>
              </div>
              <NotebooksSearchBox />
            </h2>
          {
            notebooks.map( notebook => {
              return (<NotebookIndexItem
                key={notebook.id}
                notebook={notebook}
                updatedAt={notebook.updated_at}
                toggleShowing={this.props.toggleShowing}
                />);
              })
            }
        </ul>

        <Modal
          style={style}
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}>
            <NewNotebookForm
              closeModal={this.closeModal}
              toggleShowing={this.props.toggleShowing}/>
        </Modal>

      </div>
    );
  }
});

module.exports = NotebookDrawer;
