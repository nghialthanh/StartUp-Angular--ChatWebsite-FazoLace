const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
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

const userRoute = require('./routers/uses.routes');
app.use(userRoute);
app.get('/',(req,res)=>{
  res.send('hello');
})
app.listen(8000,()=>{
    console.log('listen port 8000');
})