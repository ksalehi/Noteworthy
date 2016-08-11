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
  deleteTag(tagData, successCB, errorCB){
    $.ajax({
      method: 'DELETE',
      url: `api/tags/${tagData.tagId}`,
      data: {tagData},
      success: successCB,
      error: errorCB
    });
  }
};

module.exports = TagApiUtil;
