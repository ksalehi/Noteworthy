const NoteConstants = {
  NOTES_RECEIVED: "NOTES_RECEIVED",
  NOTE_RECEIVED: "NOTE_RECEIVED",
  NOTE_REMOVED: "NOTE_REMOVED",
  MODAL_STYLE: {
    overlay : {
      position         : 'fixed',
      top              : 0,
      left             : 0,
      right            : 0,
      bottom           : 0,
      backgroundColor  : 'rgba(100, 100, 100, 0.7)',
      zIndex           : 30
    },
    content : {
      // position         : 'relative',
      width            : '35%',
      height           : '35%',
      margin           : '185px auto',
      border           : '1px solid darkgray',
      padding          : '5px',
      zIndex           : 31,
      borderRadius     : '10px',
      backgroundColor  : 'rgba(200, 200, 200, 1)',
      display          : 'flex',
      justifyContent   : 'center'
    }
  }
};

module.exports = NoteConstants;
