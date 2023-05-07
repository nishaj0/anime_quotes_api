const User = require("../models/User");
const bcrypt = require("bcrypt");

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
   const duplicate = await User.findOne({ username: user }).exec();
   if (duplicate) return res.sendStatus(409);

   try {
      // encrypt password
      const hashPass = await bcrypt.hash(pass, 10);

      // creating and saving user data to DB
      const result = await User.create({
         username: user,
         password: hashPass,
      });

      console.log(result);

      res.status(201).json({ success: `New user ${user} created.` });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

module.exports = { handleNewUser };
