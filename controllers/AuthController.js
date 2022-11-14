
const Users                 = require("../models").User;
const bcrypt                = require("bcrypt");
const jwt                   = require("jsonwebtoken");
const {validationResult}    = require('express-validator');

const register = async(req,res)=> {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('register',{
                title : "register",
                errors : errors.array()
            })
        } else {
            const { fullname,email,password} = req.body;
            const calt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password,calt);
            await Users.create({
                    fullname : fullname,
                    email : email,
                    password : hashPassword
            })
            req.flash('msg', "Registration Complete, Please login to continue");
            res.redirect('/login')
            

        }
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        const User = await Users.findOne({where : {email : req.body.email}})
        if(!User){
            req.flash('msg', "Email Anda Tidak Terdafar");
            return res.redirect("/login");
        } 
        const check = await bcrypt.compare(req.body.password, User.password);
      
        if(!check){
            req.flash('msg', "Password Anda Salah");
            return res.redirect("/login");
        } 
      
        const user_id = User.id;
        const nama = User.nama;
        const email = User.email;
        const accessToken = jwt.sign({user_id,nama,email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn : '60s'
        });
         const refreshToken = jwt.sign({user_id,nama,email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn : '1d'
        });
        await Users.update(
            {refresh_token: refreshToken},
            {
            where: {
                id: user_id }
         });
        res.cookie('refresh_token', refreshToken, {
            httpOnly : true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.redirect('/');

    } catch (error) {
        return res.status(400).json(error.array);
    }
}

const logout = async (req,res) => {
    const refresh_token = req.cookies.refresh_token;
    if(!refresh_token) res.redirect("/login");
    const user = await Users.findOne({where : {refresh_token : refresh_token}});
    if(!user) res.redirect("/login");
    const user_id = user.id
    await Users.update({
        refresh_token : null
    },{
        where : {
            id : user_id
        }
    })
    res.clearCookie('refresh_token');
    res.redirect('/login')
}

module.exports = {
    login,
    register,
    logout
}