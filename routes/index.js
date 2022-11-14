const express           = require('express')
const tasksRouter        = require("./api/tasks")
const authRouter        = require("./api/auth.js")
const loginRouter       = require("./web/login.js")
const registerRouter    = require("./web/register.js")
const dashboardRouter   = require("./web/dashboard")
const router            = express.Router();

// api
router.use("/",         authRouter);
router.use("/tasks",    tasksRouter);
router.use("/api/user", authRouter);


// web 
router.use("/",         dashboardRouter);
router.use("/login",    loginRouter);
router.use("/register", registerRouter);


module.exports = router;
