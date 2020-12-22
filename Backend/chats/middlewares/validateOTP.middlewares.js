
module.exports.checkOTP = (nexmo,from, to , codeOTP) =>{
    nexmo.message.sendSms(from, to, codeOTP);
    console.log(codeOTP);
}