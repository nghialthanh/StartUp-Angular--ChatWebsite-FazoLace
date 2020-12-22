const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const messageRoute = require('./routes/chats.routes');
const chatsocket = require('./routes/chat.socket.route');
const sticky = require('sticky-session');
const redisAdapter = require('socket.io-redis');
app.use(cors());
//fix
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//
app.use(messageRoute);
////////////////////////////////////////////////////////
const messageModule = require('./models/message.models');
const redis = require('redis');
const host = 'redis';
const port = 6379;
const pub = redis.createClient(port, host);
const sub = redis.createClient(port, host);

const server = require('http').Server(app);
const io = require('socket.io')(server);
io.adapter( redisAdapter({pubClient: pub, subClient: sub}) );

io.on('connection', (socket) => {
  console.log("new connected " + socket.id);
  socket.on("create-account_name", async (data) => {
    socket.join(data);
    socket.accname = data;
    //create room
    try {
      const listroom = await messageModule.getAllConvention(data);
      for (var i in listroom.Items) {
        if (listroom.Items[i].conventionType === 'chatRoom') {
          socket.join(listroom.Items[i].conventionID);
          socket.roomName = listroom.Items[i].conventionID;
        }
      }
    } catch (error) {
    }
    console.log(io.sockets.adapter.rooms);
  });

  socket.on('send-req', (data) => {
    chatsocket.sendInvitationFriend(io, data)
  });
  socket.on('acceptReq', (data) => {
    console.log(data);
    io.sockets.in(data.friend).emit('sever-send-notifiyAccept', {
      account_name: data.req_friend,
      isSend: false
    });
    io.sockets.in(data.req_friend).emit('sever-send-notifiyAccept', {
      account_name: data.friend,
      isSend: true
    });
  });
  socket.on('client-send-removeFriend', (data) => {
    io.sockets.in(data).emit('sever-send-notificationRemove', {
      account_name: data.friend,
      isSend: true
    });
  });
  socket.on('sendMessage', async (data) => {
    console.log(data);
    const listTempt = [];
    listTempt.push(data.userSend);
    listTempt.push(data.userRecive);
    const message = {
      conventionID: data.roomName,
      chatID: Date.now().toString(),
      content: data.content,
      file: data.file,
      type: data.type,
      userRecive: data.userRecive,
      userSend: data.userSend,
    }
    const convention = {
      conventionImage: "",
      conventionName: "",
      conventionType: "chat",
      members: listTempt,
      conventionTime: message.chatID,
      conventionID: data.roomName,
      Owner: 'null',
    }
      const checkExitConventions = await messageModule.checkConventionExits(data.roomName);
      if (checkExitConventions.Item != null) {
        messageModule.updateTimeConvention(convention)
          .then()
          .catch()
      } else {
        messageModule.addNewConvention(convention)
          .then()
          .catch()
      }
      messageModule.addNewMessage(message)
        .then(() => {
          io.to(data.userRecive).emit('reciveMessage', data);
        })
        .catch((error) => {
          console.log(error);
        });
  });
  socket.on('SendMessRoom', async (data) => {
    try {
      const message = {
        conventionID: data.conventionID,
        chatID: Date.now().toString(),
        content: data.content,
        file: "",
        type: data.type,
        userRecive: data.userRecive,
        userSend: data.userSend,
      }
      const convention = {
        conventionTime: message.chatID,
        conventionID: data.conventionID,
      }
      const checkExitConventions = await messageModule.checkConventionExits(convention.conventionID);
      if (checkExitConventions.Item != null) {
        messageModule.updateTimeConvention(convention)
          .then()
          .catch()
      } else {
        messageModule.addNewConvention(convention)
          .then()
          .catch()
      }
      messageModule.addNewMessage(message)
        .then(() => {
          socket.broadcast.to(data.conventionID).emit('reciveMessageRoom', data);
        })
        .catch((error) => {
          console.log(error);
        })
    } catch (error) {
      console.log(error);
    }
  });
  socket.on('typing',(data)=>{
    socket.broadcast.to(data.user_recive).emit('serverSendTyping', data);
  });
  socket.on('untyping',(data)=>{
    socket.broadcast.to(data.user_recive).emit('serverSendUnTyping', data);
  })
  socket.on('disconnect', function () {
    console.log('Socket disconnected');
  });
});
//////////////////////////////////////////////////////////////////
// server.listen(8000, () => {
//   console.log('listen port 8000');
// })
// server.listen(process.argv[2] || 8000, () => {
//   console.log(`App is listening at ${process.argv[2] || 8000}`);
// });
sticky.listen(server, 8000);
console.log(`App is listening at  8000`);
