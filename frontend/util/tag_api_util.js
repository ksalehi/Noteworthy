const TagApiUtil = {
  createTag(TagData, successCB){
    $.ajax({
      method: 'POST',
      url: 'api/tags',
      data: {tag: TagData},
      success: successCB
    });
  },
  deleteTag(TagData, successCB){
    $.ajax({
      method: 'DELETE',
      url: 'api/tags',
      data: {tag: TagData},
      success: successCB
    });
  }
};

module.exports = TagApiUtil;
