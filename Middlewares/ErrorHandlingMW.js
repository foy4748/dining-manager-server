const ErrorHandlingMW = (error, req, res, nxt) => {
  console.error(error);
  return res.status(res.status_code).send({
    error: true,
    message: res.msg,
  });
};

module.exports = ErrorHandlingMW;
