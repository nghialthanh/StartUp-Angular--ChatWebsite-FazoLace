const db = require('../config/connectDB');
const friendList = {
    getAllListFriend: (account_name) => {
        return new Promise((resolve, reject) => {
            db.query("select * from FriendLists Where (friend = ? or req_friend= ?) and fl_status='accepted'", 
            [account_name, account_name],
            (err, rows) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows);
                }
            });
        });
    },
    getOne:(friend)=>{
        return new Promise((resolve,reject)=>{  
            db.query("select * from FriendLists  where friend= ? and req_friend=?", [friend.friend,friend.req_friend], (err, res) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(res);
                }
            });
        })
    },
    getAllReqPending: (account_name) => {
        return new Promise((resolve, reject) => {
            db.query("select * from FriendLists Where (friend=? ) and fl_status='pending'", [account_name], (err, res) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(res);
                }
            });
        });
    },
    deleteFriend: (friend) => {
        return new Promise((resolve, reject) => {
            db.query("delete from FriendLists where friend=? and req_friend=?", [friend.friend,friend.req_friend], (err, res) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(res);
                }
            });
        });
    },
    acceptFriend: (friend,req_friend) => {
        return new Promise((resolve, reject) => {
            db.query("update FriendLists set fl_status=? where friend=? and req_friend=?", ["accepted", friend,req_friend], (err, res) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(res);
                }
            });
        });
    },
    addFriend: (friendList) => {
        return new Promise((resolve, reject) => {
            db.query('insert into FriendLists(friend,req_friend,fl_status)value(?,?,?)',
                [friendList.friend,
                friendList.req_friend,
                friendList.fl_status],
                (err, res) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(res);
                    }
                });
        });
    },
    checkIsFriend: (friend, req_friend) => {
        return new Promise((resolve, reject) => {
            db.query("select * from FriendLists Where friend =? and req_friend=? and (fl_status ='accepted' or fl_status='pending')", [friend, req_friend], (err, res) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(res);
                }
            });
        });
    },
}
module.exports = friendList;