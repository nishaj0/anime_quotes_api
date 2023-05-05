const userDB = {
   users: require("../models/users.json"),
   setUsers: (data) => (userDB.users = data),
};

const handleLogout = (req, res) => {
   // get data from req
   const cookies = req.cookie;
   if (!cookies?.jwt) return res.sendStatus(204); //No Content
   const refreshToken = cookies.jwt;

   // check refresh token is in DB
   const foundUser = userDB.users((u) => {
      return u.refreshToken === refreshToken;
   });
   if (!foundUser) {
      res.clearCookie("jwt", {
         httpOnly: true,
         sameSite: "None",
         /*secure:true,*/
      });
      res.sendStatus(204);
   }

   // Delete refresh token in DB
   const otherUsers = userDB.users.filter((u) => {
      return u.refreshToken === foundUser.refreshToken;
   });
   foundUser.refreshToken = "";
   userDB.setUsers([...otherUsers, foundUser]);

   res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      /*secure:true,*/
   });
   res.sendStatus(204);
};

module.exports = { handleLogout };
