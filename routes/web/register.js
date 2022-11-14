const express = require('express')
// import { pageLogin } from "../../Controllers/LoginController.js";
const router = express.Router();

router.get('/', (req,res) =>{
    
    res.render('register',{
        layout : false,
        title : "Register",
    });
});


module.exports = router;
