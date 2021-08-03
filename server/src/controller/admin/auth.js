const jwt = require("jsonwebtoken");

// local import
const User = require("../../models/user");

exports.signup = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (user)
      return res.status(400).json({
        message: "Admin already registered",
      });

    if (err) console.log(err);

    // new user in database
    const { firstName, lastName, email, password } = req.body; // destructuring
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
      role: "admin",
    });

    _user.save((err, data) => {
      if (err)
        return res.status(400).json({
          message: "Something went wrong!",
        });

      if (data) {
        return res.status(201).json({
          // user: data
          message: "Admin created successfully..!",
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) return res.status(400).json({ err });
    if (user) {
      if (user.authenticate(req.body.password) && user.role === "admin") {
        // token
        const token = jwt.sign(
          {
            _id: user._id,
            role: user.role,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );

        // destructure user
        const { _id, firstName, lastName, email, role, fullName } = user;

        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).json({
          message: "Invalid password",
        });
      }
    } else {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }
  });
};
