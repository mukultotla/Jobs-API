const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const authMiddleware = (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { userId: payload.userId, name: payload.name };
      next();
    } else {
      throw new Error("User unauthorized | Missing required headers");
    }
  } catch (error) {
    console.log(error.message);
    res.status(StatusCodes.UNAUTHORIZED).json({
      msg: error.message,
    });
  }
};
module.exports = authMiddleware;
