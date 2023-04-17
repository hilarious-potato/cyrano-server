module.exports = (app) => {
  app.use((req, res, next) => {
    // this middleware runs whenever requested page is not available
    res.status(404).json({ message: "This route does not exist" });
  });

  app.use((err, req, res, next) => {
    // whenever you call next(err), this middleware will handle the error
    // always logs the error
    console.error("ERROR", req.method, req.path, err);

    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
      if (err.code === "invalid_token") {
        res
          .status(401)
          .json({
            message: "your login is not valid",
            explanation: err.inner.message,
          });
      } else {
        res.status(500).json({
          message: "Internal server error. Check the server console",
        });
      }
    }
  });
};
