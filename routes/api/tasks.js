const express           = require('express')
const {create,getTaskById}          = require("../../controllers/TaskController")

const router            = express.Router();


router.post("/",    create);
router.get("/:id" , getTaskById);


module.exports = router;
