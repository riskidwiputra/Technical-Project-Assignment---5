
const Users         = require("../models").User;
const Tasks          = require("../models").task;
const Labels        = require("../models").label;
const Assigned        = require("../models").assigned;

const home = async (req,res) => {

   try {
        const refreshToken  = req.cookies.refresh_token;
        const getUser       = await Users.findOne({where : {refresh_token : refreshToken}});
        let data = {
            label : await Labels.findAll(),
            users : await Users.findAll(),
            getStatusOne : await Tasks.findAll({
                where : {status_task : 1},
                include: [
                    {
                        model: Labels,
                        attributes:['name']
                        // include: [Group]
                    },
                    {
                        model: Assigned,
                        attributes:['id_user'],
                        include: [
                            {
                                model : Users,
                                attributes:['fullname'],
                            }
                        ]
                    }
                    // Labels,
                    // Assigned
                ]
            }), 
            getStatusTwo : await Tasks.findAll({where : {status_task : 2}}), 
            getStatusThree : await Tasks.findAll({where : {status_task : 3}}), 
        }
        res.render('dashboard', {
            layout  : "layouts/main",
            title   : "Dashboard",
            user    : getUser,
            addData : data,
            BASEURL : process.env.BASEURL
        });
        // console.log(data);
    } catch (error) {
       console.log(error)
    }
}
module.exports = {
    home
}
