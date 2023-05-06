const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
   const authHeader = req.headers.authorization || req.headers.Authorization;
   if (!authHeader?.startsWith("Bearer"))
      return res.status(401).send("data not found in headers authorization"); //Unauthorized
   const token = authHeader.split(" ")[1];
   console.log({ token });

   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).send("Invalid Token"); //forbidden
      req.user = decoded.userInfo.username;
      req.roles = decoded.userInfo.roles;
      next();
   });
};

module.exports = verifyJWT;
