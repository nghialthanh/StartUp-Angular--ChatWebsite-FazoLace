const db = require('../config/connectDB');
const Account = {
  getAllAccount: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT Accounts.account_name, account_status, account_Role, Users.user_name FROM Accounts INNER JOIN Users ON Accounts.account_name=Users.account_name ", (err, res) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(res);
        }
      });

    })
  },
  getAll: (callBack) => {
    return db.query("SELECT * FROM Accounts ", callBack);
  },
  getOneAccount: (account_name) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT account_pass, account_name, account_status, account_Role FROM Accounts WHERE account_name = ?", [account_name], (err, res) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(res);
        }
      });

    });
  },
  addAccount: (acc) => {
    return new Promise((resolve, reject) => {
      db.query("Insert into Accounts(account_name, account_pass, account_status, account_Role) values(?,?,?,?)", [
        acc.account_name,
        acc.account_pass,
        acc.account_status,
        acc.account_Role], (err, res) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(res);
          }
        });
    });
  },
  deleteAccount: (account_name) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE from Accounts Where account_name = ?', [account_name], (err, res) => {
        if (err) {
          return reject(err);
        } else return resolve(res);
      });
    });
  },
  updateAccount: (account_name, acc) => {
    return new Promise((resolve, reject) => {
      db.query("update Accounts set account_status=?,account_Role=? where account_name = ?", [acc.account_status, acc.account_Role, account_name], (err, res) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(res);
        }
      });

    })
  },
  updateAccountwithpass: (account_name, pass) => {
    return new Promise((resolve,reject)=>{
     db.query("update Accounts set account_pass=? where account_name = ?", [pass, account_name], (err,res)=>{
       if(err){
         return reject(err);
       }else{
         return resolve(res);
       }
     });      
    })
  },
  getOneAccountNoPass: (account_name) => {
    return new Promise((resolve,reject)=>{
       db.query("SELECT account_name, account_status, account_Role FROM Accounts WHERE account_name = ?", [account_name], (err,res)=>{
         if(err){
           return reject(err);
         }else{
           return resolve(res);
         }
       });
    });
  },
  updateAccountStatus: (account_name, account_status) => {
    return new Promise((resolve, reject) => {
      db.query("update Accounts set account_status=? where account_name = ?", [account_status, account_name], (err, res) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(res);
        }
      });
    });
  }
};
module.exports = Account;