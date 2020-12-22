
const userModel = require('../models/user.models');
const friendList = require('../models/friendLists.models');
module.exports.getAllFriend = async (req, res) => {
    const list = [];
    try {
        console.log(req.params);
        const listfriend = await friendList.getAllListFriend(req.params.account_name);
        for (var i in listfriend) {
            if (listfriend[i].friend === req.params.account_name) {
                list.push({ account_name: listfriend[i].req_friend });
            }
            else if (listfriend[i].req_friend === req.params.account_name) {
                list.push({ account_name: listfriend[i].friend });
            }
        }
    } catch (error) {
        res.status(400).send({ message: "loi " + error });
    }
    Promise.all(list)
        .then(list => {
            if (list != '') {
                userModel.getListUserbyListAccountName(list)
                    .then(result => res.send({ result: result }))
                    .catch(err => res.status(400).send({ message: err }));
            } else {
                return res.send({ result: [] });
            }

        })
        .catch(err => res.status(400).send({ message: err }));
}

module.exports.getAllListPending = async (req, res) => {
    const list = [];
    try {
        const lstFriend = await friendList.getAllReqPending(req.params.account_name);
        for (var i in lstFriend) {
            list.push({ account_name: lstFriend[i].req_friend });
        }
    } catch (error) {
        return res.status(400).send({ message: "loi" + error });
    }
    if (list == '') {
        return res.send({ result: [] });
    } else {
        Promise.all(list)
            .then((rows) => {
                userModel.getListUserbyListAccountName(rows)
                    .then(result => {
                        res.send({ result: result })
                    })
                    .catch(err => res.status(400).send({ message: err }));
            })
            .catch(err => res.status(400).send({ message: err }));
    }
}

module.exports.addFriend = async (req, res) => {
    try {
        const checkFriend = await friendList.checkIsFriend(req.body.friend, req.body.req_friend);
        if (!checkFriend[0] == 0) {
            return res.send({ message: "is friend" });
        } else {
            const newFriendList = {
                friend: req.body.friend,
                req_friend: req.body.req_friend,
                fl_status: "pending"
            }
            friendList.addFriend(newFriendList)
                .then(result => res.send({ message: "succesfully" }))
                .catch(err => res.status(400).send({ message: "Loi: " + err }));
        }
    } catch (error) {
        res.status(400).send({ message: error });
    }
}
module.exports.deleteFriendAndReqFriend = async (req, res) => {
    const dataA = {
        friend: req.body.friend,
        req_friend: req.body.req_friend
    }
    const dataB = {
        friend: req.body.req_friend,
        req_friend: req.body.friend,
    }
    try {
        const A = await friendList.getOne(dataA);
        if (A != '') {
            friendList.deleteFriend(dataA)
                .then(() => res.send({ message: "succesfully" }))
                .catch(err => res.status(400).send({ message: err }));
        } else {
            friendList.getOne(dataB)
                .then((result) => {
                    friendList.deleteFriend(dataB)
                        .then(() => res.send({ message: "succesfully" }))
                        .catch(err => res.status(400).send({ message: err }));
                })
                .catch(err => console.log(err))
        }
    } catch (error) {
        res.status(400).send({ message: error });
    }
}
module.exports.accpectAddFriend = (req, res) => {
    friendList.acceptFriend(req.body.friend, req.body.req_friend)
        .then(result => res.send({ message: "successfully" }))
        .catch(err => res.status(400).send({ message: err }));
};

module.exports.getFriendAndMeAndUserOfMyFriend = async (req, res) => {
    const planA = {
        me: req.body.infoAcc,
        friend: req.body.infoInput
    }
    try {
        const check = await friendList.checkIsFriend(planA.me, planA.friend)
        if (!check.length == 0) {
            userModel.getOneUserbyAccountName(planA.friend)
                .then(result => res.send({
                    dataFriend: result,
                    row: check
                }))
                .catch(err => res.status(400).send(err))
        } else {
            try {
                const check = await friendList.checkIsFriend(planA.friend, planA.me)
                if (!check.length == 0) {
                    userModel.getOneUserbyAccountName(planA.friend)
                        .then(result => res.send({
                            dataFriend: result,
                            row: check
                        }))
                        .catch(err => res.status(400).send(err))
                }
                else {
                    try {
                        const inforFriend = await userModel.getOneUserbyAccountName(planA.friend);
                        if (!inforFriend.length == 0) {
                            return res.send({ dataFriend: inforFriend, messages: 'is not friend' });
                        } else {
                            return res.send({ messages: "can't found data friend" });
                        }
                    } catch (error) {
                        return res.status(400).send({ messages: error });
                    }
                }
            } catch (error) {
                return res.status(400).send({ messages: error })
            }
        }
    } catch (error) {
        return res.status(400).send({ messages: error });
    }
}
module.exports.addFriendFunction = async (me, you) => {
    try {
        const checkFriend = await friendList.checkIsFriend(me, you);
        if (!checkFriend[0] == 0) {
            return console.log({ message: "is friend" });
        } else {
            const newFriendList = {
                friend: me,
                req_friend: you,
                fl_status: "pending"
            }
            friendList.addFriend(newFriendList)
                .then(result => console.log({ message: "succesfully" }))
                .catch(err => console.log({ message: "Loi: " + err }));
        }
    } catch (error) {
        console.log({ message: error });
    }
}
