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
      backgroundColor  : 'rgba(255, 255, 255, 0.5)',
      zIndex           : 10
    },
    content : {
      // position         : 'relative',
      width            : '35%',
      height           : '35%',
      margin           : '185px auto',
      border           : '1px solid #ccc',
      padding          : '5px',
      zIndex           : 11,
      borderRadius     : '10px',
      backgroundColor  : 'rgba(140, 140, 140, 0.95)',
      display          : 'flex',
      justifyContent   : 'center'
    }
  }
};

module.exports = NoteConstants;
