import express from 'express';

import { signup } from '../controllers/auth.js';

const router = express.Router();


router.post('/signup', signup);

router.get('/public', (req, res, next) => {
    res.status(200).json({message: 'here is your public resources'});
});

router.use('/', (req, res, next) => {
    res.status(404).json({error : "page not found"});
    console.log('sheesh');
})

export default router;