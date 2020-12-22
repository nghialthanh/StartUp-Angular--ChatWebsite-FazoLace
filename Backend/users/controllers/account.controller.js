const account = require("../models/account.models")
const user = require("../models/user.models")
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.UpdateAccount = async (req, res) => {
    const newAccount = {
        account_name: req.body.account_name,
        account_status: req.body.account_status,
        account_Role: req.body.account_Role,
    }
    account.updateAccount(newAccount.account_name, newAccount)
        .then(acc => res.send(acc))
        .catch(err => res.status(400).send({ message: err }));
}

module.exports.createAccForAdmin = async (req, res) => {
    try {
        const acc = await user.getOneUserbyAccountName(req.body.account_name);
        if (!acc[0] == 0) {
            return res.send({ message: "trung tai khoan" + acc });
        } else {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashPass = bcrypt.hashSync(req.body.account_pass, salt);
            const newAcc = {
                account_name: req.body.account_name,
                account_pass: hashPass,
                account_status: req.body.account_status,
                account_Role: req.body.account_Role,
            }
            const newUser = {
                user_name: req.body.user_name,
                user_image: req.body.user_image,
                user_phone: req.body.user_phone,
                user_gender: req.body.user_gender,
                user_email: req.body.user_email,
                user_date: req.body.user_date,
                account_name: req.body.account_name,
            }
            account.addAccount(newAcc)
                .then(acc => user.addUser(newUser))
                .then(u => res.send(u))
                .catch(err => res.status(400).send({ message: err }));
        }
    } catch (error) {
        return res.send(400).send({ message: error });
    }

}
module.exports.deleteUser = (req, res) => {
    console.log(req.body)
    try {
        const userGet = user.getOneUserbyAccountName(req.body.account_name);
        user.deleteUser(userGet.user_id)
            .then(res => res.send({ message: "successfully" }))
            .catch(err => res.status(400).send({ message: err }));
    } catch (err) {
        res.status(400).send({ message: err });
    }
}

module.exports.changePassword = async (req, res) => {
    var user_account = {
        name: req.body.account_name,
        pass: req.body.account_pass,
    };
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPass = bcrypt.hashSync(req.body.passNew, salt);
    try {
        const getAcc = await account.getOneAccount(user_account.name);
        const checkPass = await bcrypt.compare(user_account.pass, getAcc[0].account_pass);
        if (checkPass) {
             try {
                 const newPass = await account.updateAccountwithpass(user_account.name,hashPass);
                 return res.send({message:"succesfully"});
             } catch (error) {
                 return res.status(400).send({message:error});
             }
        }
        return res.status(403).send({ message: "wrong password" });
    } catch (error) {
        return res.status(400).send({message:error});
    }
};

module.exports.getALlAccount = async(req,res)=>{
    try {
        const list = await account.getAllAccount()
        return res.send(list)
    } catch (error) {
        return res.status(400).send({message:error});
    }
};
module.exports.updateAccountStatus = async (req,res)=>{
    console.log(req.body);
    account.updateAccountStatus(req.body.account_name,req.body.account_status)
    .then((result)=>res.send(result))
    .catch((error)=>res.status(400).send({message:error}));   
}

module.exports.deleteAccount = async (req, res) => {
    user.getOneUserbyAccountName(req.body.account_name)
    .then((result) =>user.deleteUser(result.user_id))
    .then(()=>account.deleteAccount(req.body.account_name))
    .then((kq)=>res.send({message:kq}))
    .catch((error)=>res.status(400).send({message:error}));
}

