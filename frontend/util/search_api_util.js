const SearchApiUtil = {
  fetchNotes(successCB, data={}) {
    $.ajax({
      method: 'GET',
      url: 'api/notes',
      data: data,
      success: successCB
    });
  },
};

module.exports = SearchApiUtil;
