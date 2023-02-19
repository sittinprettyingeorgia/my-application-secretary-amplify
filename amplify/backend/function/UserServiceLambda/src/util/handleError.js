module.exports.getError = (e) => {
    let message = '';
    let err;
  
    if (e.response) {
      message =
        'The request was made and the server responded with a status code that falls out of the range of 2xx';
      err = { message, status: e?.response?.status, data: e?.response?.data};
    } else if (e.request) {
      message =
        'The request was made but no response was received `e.request` is an instance of XMLHttpRequest' +
        ' in the browser and an instance of http.ClientRequest in node.js';
      err = { message, error: e.request};
    } else {
      message =
        'Something happened in setting up the request that triggered an error';
      err = { message };
    }
  
    return err;
  };