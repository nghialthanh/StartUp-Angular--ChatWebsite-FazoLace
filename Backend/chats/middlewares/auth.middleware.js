const jwt = require("jsonwebtoken");
require("custom-env").env("app");

//ham nay se kiem tra nguoi dung co token hay chua, neu co thi co trung voi ten tai khoan hay khong
//input: token, username (la account name )(nhung input nay duoc truyen len tu client)
//output: se chuyen den den hoat dong tiep theo neu xac thuc thanh cong
//    neu loi:se tra ve ma loi (trong ham co giai thich)
module.exports.requireAuth = async function (req, res, next) {
  const token = req.body.token ? req.body.token : null;
  const name = req.body.account_name ? req.body.account_name : null;
  if (token) {
    // Xác thực mã token và kiểm tra thời gian hết hạn của mã
    try {
      const decoded = await verifyJwtToken(token, process.env.SECRET_KEY);
      if (decoded["name"] != name) {
        throw new Error("fake token");
      }
      // Lưu thông tin giã mã được vào đối tượng req, dùng cho các xử lý ở sau

      res.locals.account = decoded;
      next();
    } catch (err) {
      // Giải mã gặp lỗi: Không đúng, hết hạn...
      return res.status(401).json({
        message: "Unauthorized access.",
      });
    }
  } else {
    // Không tìm thấy token trong request
    return res.status(403).send({
      message: "No token provided.",
    });
  }
};

function verifyJwtToken(token, secretKey) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
}
