const bcrypt = require('bcrypt')
const User = require('../models/user.model');
var jwt = require('jsonwebtoken')

exports.register = async (req, res, next) => {
    const createUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email
    });

    try {
        const userSave = await createUser.save();
        let userToken = jwt.sign({
            id: createUser._id,
            isAdmin: createUser.isAdmin
        }, process.env.JWT_SECRET
        )
        return res.send({
            success: true,
            message: "User Registered",
            auth: true,
            token: userToken
        })
    }catch(err) {
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try {
        const logUser = await User.findOne({email: req.body.email})
        console.log(logUser);
        
        if(!logUser) {
            const error = new Error('User not found')
            error.status = 404
            throw error;
        }

        let passwordValid = bcrypt.compareSync(req.body.password, logUser.password);
        if (!passwordValid) {
            const error = new Error('Password is not valid')
            error.status = 401
            throw error;
        }

        let userToken = jwt.sign({
            id: logUser._id,
            isAdmin: logUser.isAdmin
        }, process.env.JWT_SECRET
        )
        return res.send({
            success: true,
            message: 'User Logged',
            auth: true,
            token: userToken
        })
    } catch (err) {
        next(err);
    }
}