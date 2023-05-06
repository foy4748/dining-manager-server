const ErrorHandlingMW = (error, req, res, nxt) => {
  console.error(error);
  return res.send({
    error: true,
    message: res.msg,
  });
};

module.exports = ErrorHandlingMW;
