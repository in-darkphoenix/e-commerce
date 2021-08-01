const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // hashing password

// schema for user
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        required: true,
        min: 8
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    contactNumber: {
        type: String
    },
    profilePicture: {
        type: String
    }
}, {
    timestamps: true
});

// setting virtual property, here 'password'
userSchema.virtual('password')
.set(function(password) {
    this.hash_password = bcrypt.hashSync(password, 10);
});

// create methods
userSchema.methods = {
    // returns true if password matches
    authenticate: function(password) {
        return bcrypt.compare(password, this.hash_password);
    }
};

module.exports = mongoose.model('User', userSchema);