const AppDispatcher = require('../dispatcher/dispatcher');
const NoteConstants = require('../constants/note_constants');
const ErrorActions = require('./error_actions');
const TagApiUtil = require('../util/tag_api_util');
const NoteActions = require('../actions/note_actions');

const TagActions = {
  createTag(tagData){
    TagApiUtil.createTag(tagData, NoteActions.receiveNote, ErrorActions.setErrors);
  }
};

module.exports = TagActions;
