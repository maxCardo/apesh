const express = require('express')
//const useUnless = require('../middleware/useUnless')


const router = express.Router()
//router.use(useUnless(auth, ['/', '/login']));


// @route: GET /api/user;
// @desc: load user
// @ access: Public
router.get('/', (req, res) => {
    console.log(req.body);  
})

// @route: POST /api/user/login;
// @desc: login user
// @ access: Public
router.post('/login', (req, res) => {
    console.log(req.body);  
})

// @route: POST /api/user/logout;
// @desc: logout user
// @ access: Public
router.get('/logout', (req, res) => {
    console.log(req.body);  
})


module.exports = router