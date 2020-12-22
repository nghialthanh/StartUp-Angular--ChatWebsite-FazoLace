const messageModel = require('../models/message.models');
module.exports.getAllConvention =  async (req,res)=>{
    try {
        const list = await messageModel.getAllConvention(req.body.account_name);
        return res.send(list);
    } catch (error) {
        return res.status(400).send({message:error});
    }
};
module.exports.getAllMessageByConventionID = async(req,res)=>{
    try {
        const list = await messageModel.getAllMessageByConventionID(req.body.conventionID,req.body.chatID);
        return res.send(list);
    } catch (error) {
        return res.status(400).send({message:error});
    }
}
module.exports.addNewMessage = async(req,res)=>{
    try {
        const message={
            conventionID:req.body.conventionID,
            chatID:req.body.chatID,
            conventionImage:req.body.conventionImage,
            conventionName:req.body.conventionName,
            conventionType:req.body.conventionType,
            file:req.body.file,
            image:req.body.image,
            members:req.body.members,
            owner:req.body.owner,
            time:req.body.time,
            content:req.body.content,
            userSend:req.body.userSend,
            userRecive:req.body.userRecive
        }
        const result = await messageModel.addNewMessage(message);
        return res.send(result);
    } catch (error) {
        return res.status(400).send({message:error});
    }
}

module.exports.addConvention= async(req,res)=>{
        const convention ={
            conventionID:req.body.conventionID,
            conventionName:req.body.conventionName,
            conventionImage:req.file,
            Owner:req.body.Owner,
            members: req.body.members,
            conventionTime:req.body.conventionTime,
            conventionType:"chatRoom"
        }
        messageModel.addNewConvention(convention)
        .then((result)=>res.send({message:"successfully"}))
        .catch(err=>res.status(400).send({message:err}));
}
module.exports.updateConventionMembers = async(req,res)=>{
    const convention ={
        conventionID:req.body.conventionID,
        members: req.body.members,
    }
    messageModel.updateMemberConvention(convention)
    .then((result)=>res.send({message:"successfully"}))
    .catch(err=>res.status(400).send({message:err}));
}

module.exports.addNewMessageFile = async(req,res)=>{
    try {
        const message={
            conventionID:req.body.conventionID,
            chatID:req.body.chatID,
            conventionImage:req.body.conventionImage,
            conventionName:req.body.conventionName,
            conventionType:req.body.conventionType,
            file:req.file,
            image:req.body.image,
            members:req.body.members,
            owner:req.body.owner,
            time:req.body.time,
            content:req.body.content,
            userSend:req.body.userSend,
            userRecive:req.body.userRecive
        }
        const result = await messageModel.addNewMessage(message);
        return res.send(result);
    } catch (error) {
        return res.status(400).send({members:error});
    }
}


