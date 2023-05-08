const User = require("../models/User");

const handleLogout = async (req, res) => {
   // get data from req
   const cookies = req.cookies;
   if (!cookies?.jwt) return res.status(204).send("No data in cookies"); //No Content
   const refreshToken = cookies.jwt;

   // check refresh token is in DB
   const foundUser = await User.findOne({ refreshToken }).exec();
   if (!foundUser) {
      res.clearCookie("jwt", {
         httpOnly: true,
         sameSite: "None" /*secure:true,*/,
      });
      return res.sendStatus(204);
   }

   // Delete refresh token in DB
   foundUser.refreshToken = "";
   const result = await foundUser.save();

   res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      /*secure:true,*/
   });
   res.status(204).json({ success: "logout" });
};

module.exports = { handleLogout };
