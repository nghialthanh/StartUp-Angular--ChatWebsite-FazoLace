const acc = require('../models/account.models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const user = require('../models/user.models')
const dotenv = require('dotenv');
dotenv.config();

///twilio
// const config = require('../config');
const User = require('../models/user.models');
const { getOneAccount } = require('../models/account.models');
const client = require('twilio')(process.env.accountSID, process.env.authToken);

module.exports.sendOTP = async (req, res) => {
    var checkPhone = new RegExp(/^\d{10}$/);
    var regexMail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if (checkPhone.test(req.body.account_name)) {
        try {
            const getAcc = await getOneAccount(req.body.account_name);
            if (!getAcc[0] == 0) {
                return res.send({ message: "Trung tai khoan" });
            } else {
                var phoneNumber = "+84" + req.body.account_name.slice(1, 10);
                client
                    .verify
                    .services(process.env.serviceID)
                    .verifications
                    .create({
                        to: `${phoneNumber}`,
                        channel: "sms"
                    })
                    .then((data) => {
                        return res.send({ message: data.status })
                    });
            }
        } catch (error) {
            return res.status(400).send({ message: error });
        }
    }
    else {
        if (regexMail.test(req.body.account_name)) {
            try {
                const getAcc = await acc.getOneAccount(req.body.account_name)
                if (!getAcc[0] == 0) {
                    return res.send({ message: "Trung Account" });
                }
                else {
                    client.verify.services(process.env.serviceID)
                        .verifications
                        .create({ to: req.body.account_name, channel: 'email' })
                        .then(data => {
                            return res.send({ message: data.status });
                        });
                }
            } catch (error) {
                return res.status(400).send({ message: error });
            }
        }
    }
}

module.exports.verifyOTP = (req, res) => {
    var checkPhone = new RegExp(/^\d{10}$/);
    var regexMail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if (checkPhone.test(req.body.account_name)) {
        //phone
        console.log("is phonenumber, " + req.body);
        var phoneNumber = "+84" + req.body.account_name.slice(1, 10);
        client
            .verify
            .services(process.env.serviceID)
            .verificationChecks
            .create({
                to: `${phoneNumber}`,
                code: req.body.code
            }).then((data) => {
                console.log(data.status);
                if (data.status === "approved") {
                    const salt = bcrypt.genSaltSync(saltRounds);
                    const hashPass = bcrypt.hashSync("123456", salt);
                    const newAcc = {
                        account_name: req.body.account_name,
                        account_pass: hashPass,
                        account_status: "available",
                        account_Role: "0",

                    }
                    const newUser = {
                        user_name: "User",
                        user_image: "Default",
                        user_phone: req.body.account_name,
                        user_gender: "Nam",
                        user_email: "Default",
                        user_date: Date.now,
                        account_name: req.body.account_name,
                    }
                    acc.addAccount(newAcc)
                        .then(account => user.addUser(newUser))
                        .then(us => res.send({ message: "successfully" }))
                        .catch(err => res.status(400).send({ message: err }));
                }
            });
    }
    else if (regexMail.test(req.body.account_name)) {
        console.log('is mail');
        client.verify
            .services(process.env.serviceID)
            .verificationChecks.create(
                {
                    to: req.body.account_name,
                    code: req.body.code
                })
            .then((data) => {
                if (data.status === "approved") {
                    const salt = bcrypt.genSaltSync(saltRounds);
                    const hashPass = bcrypt.hashSync("123456", salt);
                    const newAcc = {
                        account_name: req.body.account_name,
                        account_pass: hashPass,
                        account_status: "available",
                        account_Role: "0",
                    }
                    const newUser = {
                        user_name: "User",
                        user_image: "Default",
                        user_phone: "Default",
                        user_gender: "Nam",
                        user_email: req.body.account_name,
                        user_date: Date.now,
                        account_name: req.body.account_name,
                    }
                    acc.addAccount(newAcc)
                        .then(account => user.addUser(newUser))
                        .then(us => res.send({ message: "successfully" }))
                        .catch(err => res.status(400).send({ message: err }));
                }
            });
    }
}
module.exports.updateInformationUser = async (req,res)=>{
    var checkPhone = new RegExp(/^\d{10}$/);
    var regexMail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if(checkPhone.test(req.body.account_name)){
        const data ={
            user_name:req.body.user_name,
            user_image:req.body.user_image,
            user_gender :req.body.user_gender,
            user_email:req.body.user_email,
            user_date:req.body.user_date
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPass = bcrypt.hashSync(req.body.account_pass, salt);
        user.updateUserNotPhone(req.body.account_name,data)
        .then(()=>acc.updateAccountwithpass(req.body.account_name,hashPass))
        .then(()=>res.send({messages:"update user and account succesfully"}))
        .catch(err=>res.status(400).send({messages:err}));
        
    }else if(regexMail.test(req.body.account_name)){
        const data = {
            user_name: req.body.user_name,
            user_image:req.body.user_image,
            user_gender:req.body.user_gender,
            user_phone:req.body.user_phone,
            user_date:req.body.user_date
        }  
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPass = bcrypt.hashSync(req.body.account_pass, salt);
        user.updateUserNotEmail(req.body.account_name,data)
        .then(()=>acc.updateAccountwithpass(req.body.account_name,hashPass))
        .then(()=>res.send({messages:"update user and account succesfully"}))
        .catch(err=>res.status(400).send({messages:err}));
    }
}

