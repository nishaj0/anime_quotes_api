const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
   // check data
   const cookies = req.cookies;
   if (!cookies?.jwt) return res.status(401).send("No cookie");

   const refreshToken = cookies.jwt;
   if (!refreshToken) return res.status(401).send("No refresh token in cookie");

   const foundUser = await User.findOne({ refreshToken }).exec();
   if (!foundUser) return res.status(403).send("user not found");

   // verify token
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
               expiresIn: "1h",
            }
         );

         res.json({ accessToken });
         console.log("Access token generated:", accessToken);
      }
   );
};

module.exports = { handleRefreshToken };
