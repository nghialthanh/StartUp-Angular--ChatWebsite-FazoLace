const Route = require('express').Router();
const lfController = require('../controllers/friendlist.controller');
const checkToken = require('../middlewares/auth.middleware');

Route.get('/getAllFriend/:account_name',lfController.getAllFriend);
Route.get('/getAllFriendPending/:account_name',lfController.getAllListPending);
Route.patch('/acceptFriend/',lfController.accpectAddFriend);
Route.post('/deleteFriend/',lfController.deleteFriendAndReqFriend);
Route.post('/addFried',lfController.addFriend);
Route.post('/findFriend',lfController.getFriendAndMeAndUserOfMyFriend);

module.exports= Route;