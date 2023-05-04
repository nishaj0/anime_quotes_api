const userDB = {
   users: require("../models/users.json"),
   setUsers: (data) => (userDB.users = data),
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

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

   const foundUser = userDB.users.find((u) => u.username === user);
   if (!foundUser) return res.sendStatus(401);

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
         {
            expiresIn: "1h",
         }
      );

      const refreshToken = jwt.sign(
         { username: foundUser.username },
         process.env.REFRESH_TOKEN_SECRET,
         { expiresIn: "1d" }
      );

      // save refresh token to file
      foundUser.refreshToken = refreshToken;

      // save to users.json
      const otherUsers = userDB.users.filter((u) => {
         return u.username !== foundUser.username;
      });
      userDB.setUsers([...otherUsers, foundUser]);
      console.log(otherUsers);
      fs.writeFileSync(
         path.join(__dirname, "..", "models", "users.json"),
         JSON.stringify(userDB.users)
      );

      res.cookie("jwt", refreshToken, {
         httpOnly: true,
         sameSite: true,
         /*secure: true,*/
         maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
   } else {
      return res.status(401).send("wrong password");
   }
};

module.exports = { handleLogin };
