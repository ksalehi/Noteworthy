const TagApiUtil = {
  createTag(TagData, successCB, errorCB){
    $.ajax({
      method: 'POST',
      url: 'api/tags',
      data: {tag: TagData},
      success: successCB,
      error: errorCB
    });
  }
};

module.exports = TagApiUtil;
