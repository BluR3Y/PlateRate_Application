const express = require('express');
const Auth = require('../controllers/auth.js');

const router = express.Router();

router.post('/signup', Auth.signup);

router.post('/getuser', Auth.getUser);

router.post('/public', (req, res, next) => {
    res.status(200).json({message: 'here is your public resources'});
});

router.post('/validatePassword', Auth.validatePassword);

router.use('/', (req, res, next) => {
    res.status(404).json({error : "page not found"});
    console.log('sheesh');
})

module.exports = router;