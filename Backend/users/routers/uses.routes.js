const Route = require('express').Router();

const AccountController = require('../controllers/account.controller');
const register = require('../controllers/resgister.controller');
const userController = require('../controllers/user.controller');
const auth_controller = require('../controllers/auth.controller');
const upload = require('../middleware/uploadFile.middleware');

Route.post("/login",auth_controller.auth_login);
Route.patch("/updateAccount/:account_name",AccountController.UpdateAccount);
Route.post("/adminAdd",AccountController.createAccForAdmin);
Route.delete("/deleteAccount",AccountController.deleteAccount);
Route.patch('/changePassword',AccountController.changePassword);
Route.get('/getAll',AccountController.getALlAccount);
Route.patch('/BanAccount',AccountController.updateAccountStatus);
Route.post("/sendOTP",register.sendOTP);
Route.post("/verifyOTP",register.verifyOTP);
Route.put("/updateInfoResigter",register.updateInformationUser)
Route.get("/AllInfor",userController.getALlInfor);
Route.get("/getInfo/:account_name",userController.getOneUserInfor);
Route.put("/updateInfo",upload.array('user_image',1),userController.UpdateUser);
Route.post('/getUserByList',userController.getUserByListAccountName);

module.exports = Route;