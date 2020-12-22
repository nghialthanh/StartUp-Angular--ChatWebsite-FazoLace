require("custom-env").env("app");
var accounts = require("../models/account.models");
var users = require("../models/user.models");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

module.exports.auth_login = async (req, res) => {
  var user_account = {
    name: req.body.account_name,
    pass: req.body.account_pass,
  }; 
 try {
  const getAcc = await accounts.getOneAccount(user_account.name)
  {    
    if (!getAcc[0] == 0) {
      const checkPass = await bcrypt.compare(user_account.pass, getAcc[0].account_pass);
      if (checkPass) {
            try {
            const getUser = await users.getOneUserbyAccountName(req.body.account_name);
            const token =  jwt.sign(user_account, process.env.SECRET_KEY);
            // res.header('auth-token',token).send(token);
              // res.cookie("lg", token);
              return res.cookie(200).send({
                _lg: token,
                acc: JSON.parse(JSON.stringify(getAcc)),
                user:JSON.parse(JSON.stringify(getUser))
              });
            } catch (error) {
            return res.status(400).send({message:"Loi: "+error});              
            }           
          }
      return res.status(403).send({ message: "wrong password" });
      }
    return res.status(404).send({ message: "can not find account" });
    }
 } catch (error) {
   return res.status(400).send({message:"Loi: "+error});
 }
};
