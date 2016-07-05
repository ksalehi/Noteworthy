const React = require('react');
const hashHistory = require('react-router').hashHistory;
const LogInForm = require('./login_form');
const SessionStore = require('../stores/session_store');
const Modal = require('react-modal');

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
    const style = {
      overlay : {
        position         : 'fixed',
        top              : 0,
        left             : 0,
        right            : 0,
        bottom           : 0,
        backgroundColor  : 'rgba(255, 255, 255, 0.5)',
        zIndex           : 10
      },
      content : {
        position         : 'relative',
        width            : '35%',
        height           : '35%',
        margin           : '250px auto',
        border           : '1px solid #ccc',
        padding          : '5px',
        zIndex           : 11,
        borderRadius     : '10px',
        backgroundColor  : 'rgba(140, 140, 140, 0.95)',
        display          : 'table'
      }
    };
      return (
        <div className="splash-container">
          <img className="cover-photo"></img>
          <div className="splash-text">
            <h1 className="noteworthy">Noteworthy.</h1>
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
