const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();
AWS.config.update(
  {
    accessKeyId: process.env.accessKeyIdTam,
    secretAccessKey: process.env.secretAccessKeyTam,
    region: process.env.region
  });
const docClient = new AWS.DynamoDB.DocumentClient();

var message = {
  getAllMessageByConventionID: async (conventionID, chatID) => {
    return new Promise((resolve, reject) => {
      var params = {
        TableName: "ChatDB",
        Limit: 100,
        KeyConditionExpression: "conventionID = :conventionID and chatID <= :chatID ",
        ExpressionAttributeValues: {
          ":conventionID": conventionID.toString(),
          ":chatID": chatID.toString()
        }
      };
      docClient.query(params, function (err, data) {
        if (err) {
          return reject(err);
        } else {
          return resolve(data);
        }
      });
    })
  },
  getAllConvention: (account_name) => {
    return new Promise((resolve, reject) => {
      var params = {
        TableName: "Conventions",
        Limit: 100,
        FilterExpression: "contains (#m, :acc) and #con <= :time",
        ExpressionAttributeNames: {
          "#m": "members",
          "#con": "conventionTime"
        },
        ExpressionAttributeValues: {
          ":acc": account_name,
          ":time": Date.now().toString()
        },
        ScanIndexForward: false
      };
      docClient.scan(params, onScan);
      function onScan(err, data) {
        if (err) {
          return reject(err);
        } else {
          return resolve(data);
        }
      }
    });
  },
  addNewMessage: (message) => {
    return new Promise((resolve, reject) => {
      var params = {
        TableName: "ChatDB",
        Item: {
          "conventionID": message.conventionID,
          "file": message.file,
          "time": message.time,
          "content": message.content,
          "owner": message.owner,
          "userSend": message.userSend,
          "userRecive": message.userRecive,
          "chatID": message.chatID,
          "type":message.type
        }
      };
      docClient.put(params, function (err, data) {
        if (err) {
          return reject(err);
        } else {
          return resolve(data);
        }
      });
    });
  },
  addNewConvention: (convention) => {
    return new Promise((resolve, reject) => {
      console.log(convention);
      var params = {
        TableName: "Conventions",
        Item: {
          "conventionID": convention.conventionID,
          "conventionImage": convention.conventionImage,
          "conventionName": convention.conventionName,
          "conventionType": convention.conventionType,
          "members": convention.members,
          "conventionTime": convention.conventionTime,
          "Owner": convention.Owner
        }
      };
      docClient.put(params, function (err, data) {
        if (err) {
          return reject(err);
        } else {
          return resolve(data);
        }
      });
    });
  },
  updateTimeConvention: (convention) => {
    return new Promise((resolve, reject) => {
      var params = {
        TableName: "Conventions",
        Key: {
          "conventionID": convention.conventionID,
        },
        UpdateExpression: "set conventionTime = :t",
        ExpressionAttributeValues: {
          ":t": convention.conventionTime,
        },
        ReturnValues: "UPDATED_NEW"
      };
      docClient.update(params, function (err, data) {
        if (err) {
          return reject(err);
        } else {
          return resolve(data);
        }
      });
    });
  },
  updateMemberConvention: (convention) => {
    return new Promise((resolve, reject) => {
      var params = {
        TableName: "Conventions",
        Key: {
          "conventionID": convention.conventionID,
        },
        UpdateExpression: "set members = :m",
        ExpressionAttributeValues: {
          ":m": convention.members,
        },
        ReturnValues: "UPDATED_NEW"
      };
      docClient.update(params, function (err, data) {
        if (err) {
          return reject(err);
        } else {
          return resolve(data);
        }
      });
    });
  },
  updateMemberConvention: (convention) => {
    return new Promise((resolve, reject) => {
      var params = {
        TableName: "Conventions",
        Key: {
          "conventionID": convention.conventionID,
        },
        UpdateExpression: "set members = :m",
        ExpressionAttributeValues: {
          ":m": convention.members,
        },
        ReturnValues: "UPDATED_NEW"
      };
      docClient.update(params, function (err, data) {
        if (err) {
          return reject(err);
        } else {
          return resolve(data);
        }
      });
    });
  },
  checkConventionExits: (conventionID) => {
    return new Promise((resolve, reject) => {
      var params = {
        TableName: "Conventions",
        Key: {
          "conventionID": conventionID,
        }
      };
      docClient.get(params, function (err, data) {
        if (err) {
          return reject(err)
        } else {
          return resolve(data)
        }
      });
    })
  },
}
module.exports = message;