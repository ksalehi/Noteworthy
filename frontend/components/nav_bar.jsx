const React = require('react');
const NoteActions = require('../actions/note_actions');
const NotebookActions = require('../actions/notebook_actions');
const hashHistory = require('react-router').hashHistory;
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');
const NotebookStore = require('../stores/notebook_store');

const NavBar = React.createClass({
  getInitialState() {
    return {
      loggedIn: true,
      defaultNotebook: null
    };
  },
  componentDidMount(){
    this.notebookListener = NotebookStore.addListener(this._updateNotebooks);
    this.sessionListener = SessionStore.addListener(this._handleRedirect);
    NotebookActions.fetchNotebooks();
  },
  componentWillUnmount(){
    this.notebookListener.remove();
    this.sessionListener.remove();
  },
  _handleRedirect(){
    if (!SessionStore.isUserLoggedIn()) {
      if (this.state.loggedIn) {
        hashHistory.push('/');
      }
    }
  },
  _updateNotebooks() {
    this.setState({ defaultNotebook: NotebookStore.defaultNotebook() });
  },
  notebookIndex(e){
    e.preventDefault();
    this.props.toggleShowing();
  },
  newNote(e){
    e.preventDefault();
    let notebookId;
    if (this.props.path.match('/notes/[^ ]*')) {
      notebookId = this.state.defaultNotebook.id;
    } else {
      const matched = this.props.path.match(/\/notebooks\/(\d+)/);
      notebookId = matched[1];
    }
    const noteData = {
      title: "",
      body: "",
      notebook_id: notebookId
    };
    NoteActions.createNote(noteData, this.noteCB);
  },
  noteCB(note) {
    let url;
    if (this.props.path.match('/notes/[^ ]*')) {
      url = `/notes/${note.id}`;
    } else {
      const matched = this.props.path.match(/\/notebooks\/(\d+)\/\d+/);
      if (matched) {
        const notebookId = matched[1];
        url = `/notebooks/${notebookId}/${note.id}`;
      } else {
        url = `/notebooks/${this.state.defaultNotebook.id}/${note.id}`;
      }
    }
    if (url) {
      hashHistory.push(url);
    }
  },
  logOut(e){
    e.preventDefault();
    if (this.props.showing) {
      this.props.toggleShowing();
    }
    SessionActions.logOut();
  },
  displayTooltip(e) {
    const tooltip = $(e.target).find('p');
    this.interval = setTimeout(() => {
      tooltip.addClass('show-tooltip').removeClass('hide-tooltip');
    }, 1000);
  },
  hideTooltip(e) {
    $(e.target).find('p').addClass('hide-tooltip').removeClass('show-tooltip');
    // clearTimeout(this.interval);
  },
  render: function() {
    return (
      <div className="nav-bar">
        <button className="new-note-button"
                onMouseOver={this.displayTooltip}
                onMouseOut={this.hideTooltip}
                onClick={this.newNote}>
          <i className="fa fa-plus" aria-hidden="true"></i>
          <p className="hide-tooltip">new note</p>
        </button>
        <button className="notebooks-button"
                onMouseOver={this.displayTooltip}
                onMouseOut={this.hideTooltip}
                onClick={this.notebookIndex}>
          <i className="fa fa-book" aria-hidden="true"></i>
          <p className="hide-tooltip">notebooks</p>
        </button>
        <button className="logout-button"
                onMouseOver={this.displayTooltip}
                onMouseOut={this.hideTooltip}
                onClick={this.logOut}>
          <i className="fa fa-power-off" aria-hidden="true"></i>
          <p className="hide-tooltip">logout</p>
        </button>
    </div>
    );
  }

});

module.exports = NavBar;
