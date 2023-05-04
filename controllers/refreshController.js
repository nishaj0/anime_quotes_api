const userDB = {
   users: require("../models/users.json"),
   setUsers: (data) => (userDB.users = data),
};

const jwt = require("jsonwebtoken");

const handleRefreshToken = (req, res) => {
   const { refreshToken } = req.body;
   if (!refreshToken) return res.sendStatus(401);

   const foundUser = userDB.users.find((u) => {
      return u.refreshToken === refreshToken;
   });
   if (!foundUser) return res.status(403).send("user not found");

   jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
         if (err || foundUser.username !== decoded.username)
            return res.status(403).send("user not same");

         const roles = Object.values(foundUser.roles);

         const accessToken = jwt.sign(
            {
               userInfo: {
                  username: foundUser.username,
                  roles: roles,
               },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
               expiresIn: "100s",
            }
         );

         res.json({ accessToken });
      }
   );
};

module.exports = { handleRefreshToken };