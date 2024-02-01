const { User } = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { token } = require("morgan");

let refreshTokens = [];
const authenController = {
  register: async (req, res) => {
    try {
      //Validation user is unique
      const existingUser = await User.findOne({ username: req.body.username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      // Tạo một user mới với mật khẩu đã được mã hóa
      const newUser = new User({
        userID: req.body.userID,
        username: req.body.username,
        password: hashedPassword,
        name: req.body.name,
        email: req.body.email,
        roleID: req.body.roleID,
        artworks: req.body.artworks,
        status: req.body.status,
        followerID: req.body.followerID,
        followingID: req.body.followingID,
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
      if (user && isPasswordValid) {
        // Tạo mã thông báo JWT
        const token = authenController.generateAccessToken(user);
        // Tạo refreshToken
        const refreshToken = authenController.genarateRefreshToken(user);
        // Thêm refreshToken vào mảng
        refreshTokens.push(refreshToken);
        // Lưu cookie cho refreshToken
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });

        // Chặn password đã được hash xuất ra màn hình log
        const userWithoutPassword = { ...user._doc };
        delete userWithoutPassword.password;
        res.status(200).json({
          user: userWithoutPassword,
          success: true,
          message: "Login successful",
          token,
        });
      }
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
          .status(401)
          .json({ success: false, message: "You're not authenticated" });
      }
      if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Refresh token is not valid");
      }
      jwt.verify(refreshToken, "your_refresh_key", (error, user) => {
        if (error) {
          console.log(error);
        }
        refreshTokens = refreshTokens.filter((token) => token != refreshToken);
        // Tạo mới access token và refresh token
        const newAccessToken = authenController.generateAccessToken(user);
        const newRefreshToken = authenController.genarateRefreshToken(user);
        // Thêm refreshToken vào mảng
        refreshTokens.push(newRefreshToken);
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        res.status(200).json({ accessToken: newAccessToken });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshToken");
      refreshTokens = refreshTokens.filter(
        (token) => token !== req.cookies.refreshToken
      );
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = authenController;
