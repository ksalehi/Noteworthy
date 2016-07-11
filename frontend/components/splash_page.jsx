const React = require('react');
const hashHistory = require('react-router').hashHistory;
const LogInForm = require('./login_form');
const SessionStore = require('../stores/session_store');
const Modal = require('react-modal');
const NoteConstants = require('../constants/note_constants');

const SplashPage = React.createClass({
  getInitialState: function(){
    return({ modalOpen: false });
  },
  closeModal: function(){
    this.setState({ modalOpen: false });
  },
  openModal: function(buttonText){
    let guestStatus;
    if (buttonText === 'GUEST DEMO') {
      guestStatus = true;
    } else {
      guestStatus = false;
    }
    this.setState({
      modalOpen: true,
      buttonText: buttonText,
      guestStatus: guestStatus
    });
  },
  render() {
    const style = NoteConstants.MODAL_STYLE;
      return (
        <div className="splash-container">
          <img className="cover-photo"></img>
          <div className="splash-text">
            <h1 className="noteworthy">Noteworthy.
              <img className="feather-icon"></img>
            </h1>
            <p className="slogan">You write it. We remember it.</p>
            <button className="splash-button" onClick={this.openModal.bind(this, 'LOG IN')} value="LOG IN">LOG IN</button>
            <button className="splash-button" onClick={this.openModal.bind(this, 'SIGN UP')} value="SIGN UP">SIGN UP</button>
            <button className="splash-button" onClick={this.openModal.bind(this, 'GUEST DEMO')} value="GUEST DEMO">GUEST DEMO</button>

            <Modal
              style={style}
              isOpen={this.state.modalOpen}
              onRequestClose={this.closeModal}>
                <LogInForm buttonText={this.state.buttonText}
                           guestStatus={this.state.guestStatus}/>
            </Modal>
          </div>
        </div>
      );
    }
  }
);

module.exports = SplashPage;
