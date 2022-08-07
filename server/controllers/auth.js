const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

module.exports.signup = (req, res, next) => {
    console.log(`passed: ${req.body.email}  ${req.body.password}`);
    User.findOne({email: req.body.email})
    .then(dbUser => {
        console.log(`dbFind: ${dbUser}`);
        if(dbUser) {
            return res.status(409).json({message: 'email already exists'});
        }else if(req.body.email && req.body.password) {
            bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
                if(err) {
                    return res.status(500).json({message: 'error hasing password'});
                }else if(passwordHash) {
                    return User.create(({
                        email: req.body.email,
                        name: req.body.name,
                        password: passwordHash,
                    }))
                    .then(() => {
                        res.status(200).json({message: 'user created'});
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(502).json({message: 'error while creating user'});
                    });
                };
            });
        }else if(!req.body.password) {
            return res.status(400).json({message: 'password not provided'});
        }else if(!req.body.email) {
            return res.status(400).json({message: 'email not provided'});
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

module.exports.getUser = (req, res, next) => {
    console.log('here')
    User.findOne({
        email: req.body.email
    })
    .then(dbUser => {
        if(dbUser) {
            return res.json({message: dbUser});
        }else{
            return res.status(500).json({message: 'user does not exist'});
        }
    })
}

module.exports.validatePassword = (req,res, next) => {
    var userInput = req.body.userInput;
    var password = req.body.hashedPword;
    console.log(userInput,password);
    bcrypt.compare(userInput, password, function(err, result) {
        if(err) {console.error(err)}
        return res.json({validity: result});
    })
}

