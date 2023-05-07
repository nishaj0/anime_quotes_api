const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
   const { user, pass } = req.body;

   if (!user || !pass) {
      return res.status(400).json({
         message: "username and password are required",
         format: {
            user: "",
            pass: "",
         },
      });
   }

   const foundUser = await User.findOne({ username: user }).exec();
   if (!foundUser) return res.status(401).send("user not found");

   // evaluate password
   const matchPassword = await bcrypt.compare(pass, foundUser.password);
   if (matchPassword) {
      // store roles code
      const roles = Object.values(foundUser.roles);

      // create jwt
      const accessToken = jwt.sign(
         {
            userInfo: {
               username: foundUser.username,
               roles: roles,
            },
         },
         process.env.ACCESS_TOKEN_SECRET,
         { expiresIn: "100s" }
      );

      const refreshToken = jwt.sign(
         { username: foundUser.username },
         process.env.REFRESH_TOKEN_SECRET,
         { expiresIn: "1d" }
      );

      // save refresh token to file
      foundUser.refreshToken = refreshToken;
      // save to users.json
      const result = await foundUser.save();
      console.log({ result });

      res.cookie("jwt", refreshToken, {
         httpOnly: true,
         sameSite: "None",
         /*secure: true,*/
         maxAge: 24 * 60 * 60 * 1000,
      });
      console.log({ success: "access token sended" });
      res.json({ accessToken });
   } else {
      return res.status(401).send("wrong password");
   }
};

module.exports = { handleLogin };
