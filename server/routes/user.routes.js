const { Router } = require('express');
const { register, getUser } = require('../controllers/user.controllers');
const { login } = require('../controllers/auth.controllers');
const isLoggedin = require('../middlewares/isLoggedin');

const router = Router();

router.get("/", isLoggedin, getUser);

router.post("/register", register);

router.post("/login", login);

module.exports = router;


