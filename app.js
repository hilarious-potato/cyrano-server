// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const { isAuthenticated } = require("./middleware/jwt.middleware");
const isAdmin = require("./middleware/isAdmin");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
app.use("/api", require("./routes/index.routes"));
app.use("/auth", require("./routes/auth.routes"));
app.use("/api/messages", require("./routes/message.routes"));
app.use(
  "/api/admin",
  isAuthenticated,
  isAdmin,
  require("./routes/admin.routes")
);
app.use("/api/tresors", isAuthenticated, require("./routes/tresor.routes"));
app.use(
  "/api/reports",
  isAuthenticated,
  isAdmin,
  require("./routes/report.routes")
);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
