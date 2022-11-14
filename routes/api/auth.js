const express           = require('express')
const {register,login, logout}  = require("../../controllers/AuthController")
const registerValidate  = require("../../validators/validateRegister")

const router            = express.Router();


router.post("/register",registerValidate, register);
router.post("/login",       login);
router.delete('/logout',     logout);

module.exports = router;
