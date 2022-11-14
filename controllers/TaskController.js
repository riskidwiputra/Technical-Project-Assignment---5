

const Users         = require("../models").User;
const Taks          = require("../models").task;
const Labels        = require("../models").label;
const Assigned      = require("../models").assigned;

const create = async(req,res)=> {
    try{
        const { title,description,label,assign,due_date} = req.body;
        
        let getTaks = await Taks.create({
            title : title,
            description:description,
            id_label: label,
            due_date: due_date,
            status_task : 1
        });
        const id_taks = getTaks.id;
        await Assigned.create({
            id_user : assign,
            id_task : id_taks
        });
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
}
const getTaskById = async(req,res) => {
    try {
        const task = await Taks.findOne({
            where : {
                id : req.params.id
            },include: [
                {
                    model: Labels,
                    attributes:['name']
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
            ]
        })
        res.json(task);
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    create,
    getTaskById
}