const express = require('express')
// import { pageLogin } from "../../Controllers/LoginController.js";
const router = express.Router();

router.get('/', (req,res) =>{
    res.render('login', {
        layout : false,
        title : "Login",
        messages: req.flash('msg')
    });
});


module.exports = router;
