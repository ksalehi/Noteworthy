const TagApiUtil = {
  createTag(TagData, successCB, errorCB){
    $.ajax({
      method: 'POST',
      url: 'api/tags',
      data: {tag: TagData},
      success: successCB,
      error: errorCB
    });
  },
  deleteTag(TagData, successCB, errorCB){
    $.ajax({
      method: 'DELETE',
      url: 'api/tags',
      data: {tag: TagData},
      success: successCB,
      error: errorCB
    });
  }
};

module.exports = TagApiUtil;
