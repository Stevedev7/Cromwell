const express = require('express');
const routes = require('./routes');
const { config } = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables from .env file
config();
const PORT = process.env.PORT || 4000
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/cromwell-db';

// Connect to DB
mongoose
	.connect(DB_URL)
	.then(() => console.log('Connected to db'))
	.catch((e) => {
		console.log('Cannot connect');
		process.exit(1);
	});


// Initialize Express application
const app = express();
app.use(express.json());
// Use the routes defined in the routes file
app.use('/', routes);

// Handle all other routes that are not defined
app.use('*', (req, res) => {
	res.status(404).json({
		error: {
			message: "Not found"
		}
	});
});

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`App running on port ${PORT}`));