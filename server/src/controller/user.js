// local import
const User = require('../models/user');

exports.signup = (req, res) => {
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if(user)
            return res.status(400).json({
                message: 'User already registered'
            });

        if(err)
            console.log(err);

        // new user in database
        const { firstName, lastName, email, password } = req.body; // destructuring
        const _user = new User({
            firstName, 
            lastName, 
            email, 
            password,
            username: Math.random().toString()
        });

        _user.save((err, data) => {
            if(err)
                return res.status(400).json({
                    message: 'Something went wrong!'
                });
            
            if(data) {
                return res.status(201).json({
                    // user: data
                    message: 'User created successfully..!'
                });
            }

        });
    });
}