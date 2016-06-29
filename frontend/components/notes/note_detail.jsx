const React = require('react');
const NoteStore = require('../../stores/note_store');

const NoteDetail = React.createClass({
  getInitialState(){
    const note = NoteStore.find(this.props.params.noteId);
    return ({note: note});
  },
  componentDidMount(){
    this.noteListener = NoteStore.addListener(this._onChange);
  },
  componentWillReceiveProps(nextProps){
    this.setState({note: NoteStore.find(nextProps.params.noteId)});
  },
  componentWillUnmount(){
    this.noteListener.remove();
  },
  _onChange(){
    this.setState({note: NoteStore.find(this.props.params.noteId)});
  },
  render(){
    if (this.state.note) {
      // debugger;
      console.log(this.state.note.id);
    }
    if (this.state.note){
      return (
        <article className="note-detail">
          {this.state.note.body}
        </article>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
});

module.exports = NoteDetail;
