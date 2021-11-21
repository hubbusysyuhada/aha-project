const errorHandler = (err, req, res, next) => {
  if (err.name === "custom error") {
    let codeError = err.code;
    console.log(err, "<<< error handler");
    res.status(codeError).json({ message: err.message });
  } else {
    console.log("errors >>>>>>>", err);
    if (err.err.message === "Validation error") {
      res.status(500).json({ message: err.err.message });
    }
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = errorHandler;
