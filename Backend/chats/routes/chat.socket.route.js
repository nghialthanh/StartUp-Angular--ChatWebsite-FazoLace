const userModel = require('../models/user.models');
const friendlistController = require('../controllers/friendlist.controller')
module.exports.sendInvitationFriend = async (io, data) => {
    try {
        const userSend = await userModel.getOneUserbyAccountName(data.req_friend);
        console.log(userSend);
        friendlistController.addFriendFunction(data.friend,data.req_friend);
        io.sockets.in(data.req_friend).emit('recive_invatation_friend',
            {
                infor: userSend,
                isSend: false
            });
        io.sockets.in(data.friend).emit('recive_invatation_friend', {
            infor: userSend,
            isSend: true
        });
    } catch (error) {
        console.log(error);
    }
}
module.exports.chatPrivate = async (io,data)=>{ 
}