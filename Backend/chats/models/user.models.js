const db = require("../config/connectDB");

const User = {
  getAllUser: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM Users", (err, res) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(res);
        }
      });

    })
  },
  getOneUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM Users WHERE user_id = ?", [id], (err, res) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(res);
        }
      });
    })
  },
  getOneUserbyAccountName: (account_name) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM Users WHERE account_name = ?",
        [account_name], (err, res) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(res);
          }
        });
    });
  },
  getListUserbyListAccountName:(listAcc)=>{
    return new Promise((resolve,reject)=>{
      var account_name = listAcc;
      var result_array = [];
      for (var i in account_name) {
          result_array.push(account_name[i].account_name);
      }
      db.query('SELECT * from Users Where account_name IN (?)',[result_array],(err,res)=>{
        if(err) {
          return reject(err);
        }
        else{
          return resolve(res);
        }
      });
    });
  },
  getOneUserByPhone:(phone) =>{
    return new Promise((resolve,reject)=>{
      db.query("Select * from Users WHERE account_name =?",[phone],(err,res)=>{
        if(err){
          return reject(err);
        }else{
          return resolve(res)
        }
      });
    })
  },
  getOneUserByEmail:(email)=>{
    return new Promise((resolve,reject)=>{
      db.query("SELECT * from Users WHERE account_name =?",[email],(err,res)=>{
        if(err){
          return reject(err);
        }else{
          return resolve(res);
        }
      });
    })
  },  
  addUser: (user) => {
    return new Promise((resolve, reject) => {
      db.query(
        "Insert into Users(user_name, user_image, user_phone,user_gender,user_email,user_date, account_name) values(?,?,?,?,?,?,?)",
        [
          user.user_name,
          user.user_image,
          user.user_phone,
          user.user_gender,
          user.user_email,
          user.user_date,
          user.account_name,
        ],
        (err, res) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(res);
          }
        }
      );
    });
  },
  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE from Users Where user_id = ?", [id], (err, res) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(res);
        }
      });
    });
  },
  updateUser: (id, user) => {
    return new Promise((resolve, reject) => {
      db.query(
        "update Users set user_name = ?, user_image = ?, user_phone = ?,user_gender = ?, user_email = ?,user_date = ? where account_name = ?",
        [
          user.user_name,
          user.user_image,
          user.user_phone,
          user.user_gender,
          user.user_email,
          user.user_date,
          id,
        ],
        (err, res) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(res);
          }
        }
      );
    });
  },
  findUserByPhoneNumber: (phoneNumber) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Users WHERE user_phone = ?', [phoneNumber], (err, res) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(res);
        }
      });
    });
  },
  findUserByEmail: (email) => {
   return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Users WHERE user_email = ?', [email], (err, res) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(res);
        }
      });
    });
  },
  findAllInformation: () => {
   return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Accounts a INNER JOIN Users u on a.account_name = u.account_name', (err, res) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(res);
        }
      });
    });
  },
  updateUserNotPhone: (account_name, user) => {
    return new Promise((resolve, reject) => {
      db.query(
        "update Users set user_name = ?, user_image = ?,user_gender = ?, user_email = ?,user_date = ? where account_name = ?",
        [
          user.user_name,
          user.user_image,
          user.user_gender,
          user.user_email,
          user.user_date,
          account_name,
        ],
        (err, res) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(res);
          }
        }
      );
    });
  },  updateUserNotEmail: (account_name, user) => {
    return new Promise((resolve, reject) => {
      db.query(
        "update Users set user_name = ?, user_image = ?,user_gender = ?, user_phone = ?,user_date = ? where account_name = ?",
        [
          user.user_name,
          user.user_image,
          user.user_gender,
          user.user_phone,
          user.user_date,
          account_name,
        ],
        (err, res) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(res);
          }
        }
      );
    });
  },
};

module.exports = User;
