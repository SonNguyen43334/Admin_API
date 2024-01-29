const jwt = require("jsonwebtoken");

const midderwareController = {
  //verifyToken
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1]; // Sửa đổi phần này để lấy token từ chuỗi
      jwt.verify(accessToken, "your_secret_key", (err, decoded) => {
        if (err) {
          res.status(403).json("Token is not valid");
        } else {
          req.user = decoded; // Lưu thông tin người dùng đã giải mã vào req.user
          next();
        }
      });
    } else {
      res.status(401).json("You're not authenticated");
    }
  },
};

module.exports = midderwareController;
