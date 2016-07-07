const React = require('react');
const NoteActions = require('../../actions/note_actions');
const hashHistory = require('react-router').hashHistory;

const DeleteNoteForm = React.createClass({
  getInitialState(){
    return ({
      title: ''
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
    const noteData = {
      id: this.props.note.id,
      title: this.state.title
    };
    this.props.closeModal();
    NoteActions.editNote(noteData);
  },
  render() {
    return (
      <div>
        <form className="new-note-form" onSubmit={this.handleSubmit}>
          <input type="text"
                 value={this.state.title}
                 onChange={this.changeTitle}
                 placeholder="Title Your Note"
                 className="note-title-input"/>
               <input type="submit" className="create-note-button" value='Update Note'/>
        </form>
      </div>
    );
  }

});

module.exports = DeleteNoteForm;
