const { User } = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const authenController = {
  register: async (req, res) => {
    try {
      // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
      const hashedPassword = await bcrypt.hash(req.body.password, 10); // Sử dụng bcrypt để mã hóa mật khẩu
      // Tạo một user mới với mật khẩu đã được mã hóa
      const newUser = new User({
        userID: req.body.userID,
        username: req.body.username,
        password: hashedPassword, // Lưu mật khẩu đã được mã hóa
        name: req.body.name,
        email: req.body.email,
        roleID: req.body.roleID,
        artworks: req.body.artworks,
      });
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  generateAccessToken: (user) => {
    return jwt.sign({ userId: user._id }, "your_secret_key", {
      expiresIn: "30s",
    });
  },
  genarateRefreshToken: (user) => {
    return jwt.sign({ userId: user._id }, "your_refresh_key", {
      expiresIn: "365d",
    });
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      // Tìm người dùng trong cơ sở dữ liệu bằng username
      const user = await User.findOne({ username });
      // Kiểm tra xem người dùng có tồn tại không
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Username or password is incorrect",
        });
      }
      // Kiểm tra mật khẩu
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Username or password is incorrect",
        });
      }
      // Tạo mã thông báo JWT
      const token = authenController.generateAccessToken(user);
      // Tạo refreshToken
      const refreshToken = authenController.genarateRefreshToken(user);
      // Lưu cookie cho refreshToken
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      // Không cho phép gửi mật khâu đi
      const userWithoutPassword = { ...user._doc };
      delete userWithoutPassword.password;
      res.status(200).json({
        user: userWithoutPassword,
        success: true,
        message: "Login successful",
        token,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  requestRefreshToken: async (req, res) => {
    try {
      // Lấy refreshToken từ cookies
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res
          .status(400)
          .json({ success: false, message: "Refresh token not found" });
      }
      res.status(200).json(refreshToken);
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  logout: async (req, res) => {
    try {
      // Đảm bảo rằng token đã được gửi trong tiêu đề Authorization của yêu cầu
      const token = req.headers.authorization;
      // Xóa token từ cơ sở dữ liệu hoặc lưu trữ nơi bạn đã lưu trữ token
      await TokenModel.deleteOne({ token });
      // Trả về một phản hồi xác nhận rằng token đã được hủy bỏ thành công
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = authenController;
