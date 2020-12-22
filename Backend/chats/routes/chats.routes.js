const uploadFile = require('../middlewares/uploadChat.middlewares');

const Router = require('express').Router();
const messController = require('../controllers/message.controller');
const message = require('../models/message.models');
Router.post('/getAllConvention',messController.getAllConvention);
Router.post('/getAllMessage',messController.getAllMessageByConventionID);
Router.post('/addNewMessage',messController.addNewMessage);
Router.post('/addConvention',uploadFile.array('conventionImage',1),messController.addConvention);
Router.patch('/updateMember',messController.updateConventionMembers);
Router.post('/uploadFile',uploadFile.array('file',1),(req,res)=>{
    if(req.file !=''){
        return res.send({file:req.file});
    }else{
        console.log('loi gui hinh');
    }
})

module.exports = Router;