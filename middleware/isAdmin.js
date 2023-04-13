const User = require("../models/User.model");

function isAdmin(req, res, next) {
  if (req.payload.role === "admin") {
    const checkDbForRole = async () => {
      try {
        const userFromDb = await User.findById(req.payload._id);
        if (userFromDb.role === "admin") {
          next();
        } else {
          res.status(403).json({ message: "Only for admins my friend" });
        }
      } catch (error) {
        next(error);
      }
    };
    checkDbForRole();
  } else {
    res.status(403).json({ message: "Only for admins my friend" });
  }
}

module.exports = isAdmin;
