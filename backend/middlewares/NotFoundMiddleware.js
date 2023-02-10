const NotFoundMiddleware = (req, res) =>
   res.status(404).json("Routes does not exit.");

module.exports = NotFoundMiddleware;
