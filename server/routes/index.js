const { Router } = require('express');
const userRoutes = require('./user.routes');

const router = Router();

router.use('/user', userRoutes);

router.get("/", async (req, res) => {
	res.sendStatus(200);
});

router.get("/ping", async (req, res) => {
	res.json({
		message: "Pong",
	}).status(200);
});



module.exports = router;