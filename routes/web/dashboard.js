const express       = require('express')
const router        = express.Router();
const verifyToken   = require("../../middleware/verifyToken")
const {home}        = require('../../controllers/HomeController')

router.get('/', verifyToken, home);

module.exports = router;
