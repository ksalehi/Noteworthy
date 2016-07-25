const React = require('react');
const hashHistory = require('react-router').hashHistory;
const LogInForm = require('./login_form');
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
const Modal = require('react-modal');
const NoteConstants = require('../constants/note_constants');

const SplashPage = React.createClass({
  getInitialState: function(){
    return({
      modalOpen: false
    });
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
  _handleRedirect(){
    if (SessionStore.isUserLoggedIn()) {
      // if (!this.state.loggedIn) {
        hashHistory.push('notes');
      // }
    }
  },
  guestDemo() {
    const demoData = {
      username: "guest_user",
      password: "password"
    };
    SessionActions.logIn(demoData, this._handleRedirect);
  },
  render() {
    const style = NoteConstants.MODAL_STYLE;
      return (
        <div className="splash-container">
          <div className="cover-photo"></div>
          <div className="splash-text">
            <h1 className="noteworthy">Noteworthy.
              <div className="feather-icon"></div>
            </h1>
            <script>
               (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
               (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
               m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
               })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

               ga('create', 'UA-81178102-1', 'auto');
               ga('send', 'pageview');

            </script>
            <p className="slogan">You write it. We remember it.</p>
            <button className="splash-button" onClick={this.openModal.bind(this, 'LOG IN')} value="LOG IN">LOG IN</button>
            <button className="splash-button" onClick={this.openModal.bind(this, 'SIGN UP')} value="SIGN UP">SIGN UP</button>
            <button className="splash-button" onClick={this.guestDemo} value="GUEST DEMO">GUEST DEMO</button>

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
