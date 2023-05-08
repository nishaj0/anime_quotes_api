const User = require("../models/User");

const getUserProfile = async (req, res) => {
   const cookies = req.cookies;
   if (!cookies?.jwt) return res.status(204).send("No data in cookies"); //No Content
   const refreshToken = cookies.jwt;

   const foundUser = await User.findOne({ refreshToken });
   if (!foundUser) return res.sendStatus(204);

   res.json({ username: foundUser.username, roles: foundUser.roles });
};

module.exports = { getUserProfile };
