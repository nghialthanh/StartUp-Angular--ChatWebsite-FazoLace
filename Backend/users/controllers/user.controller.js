const user = require("../models/user.models")

module.exports.getALlInfor = (req, res) => {
    user.findAllInformation()
        .then(rows => res.send(rows))
        .catch(err => res.status(400).send({ messages: err }));
}
module.exports.getOneUserInfor = (req, res) => {
    user.getOneUserbyAccountName(req.params.account_name)
        .then(row => res.send(row[0]))
        .catch(err => res.status(400).send({ messages: err }))
}
module.exports.UpdateUser = (req, res) => {
    const newUser = {
        user_name: req.body.user_name,
        user_image: req.file,
        user_phone: req.body.user_phone,
        user_gender: req.body.user_gender,
        user_email: req.body.user_email,
        user_date: req.body.user_date,
    }
    user.updateUser(req.body.account_name, newUser)
        .then(result => res.send({ message: "successfully" }))
        .catch(err => res.status(400).send({ messages: err }))
}
module.exports.getUserByListAccountName = (req, res) => {
    user.getListUserbyListAccountName(req.body)
        .then((result) => res.send(result))
        .catch((err) => res.status(400).send({ message: err }));
}



