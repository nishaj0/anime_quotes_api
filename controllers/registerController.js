const userDB = {
   users: require("../models/users.json"),
   setUsers: (data) => (userDB.users = data),
};

const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const handleNewUser = async (req, res) => {
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

   // check there is any duplicate of this username
   const duplicate = userDB.users.find((u) => u.username === user);
   if (duplicate) return res.sendStatus(409);

   try {
      // encrypt password
      const hashPass = await bcrypt.hash(pass, 10);

      const newUser = {
         username: user,
         password: hashPass,
         roles: {
            user:2001
         }
      };
      userDB.setUsers([...userDB.users, newUser]);

      // write data to file
      fs.writeFileSync(
         path.join(__dirname, "../models/users.json"),
         JSON.stringify(userDB.users)
      );
      console.log(newUser);
      res.status(201).json({
         success: `New user created ${newUser.username}.`,
      });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

module.exports = { handleNewUser };
