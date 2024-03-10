const router = require("express").Router();

// Import our modular routers for /tips and /feedback
const notesRouter = require("./notes");
// TODO: import your diagnostics route
router.use("/notes", notesRouter);
// TODO: Initialize diagnostics route

module.exports = router;
