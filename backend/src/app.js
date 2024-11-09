const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const codeExecutorRouter = require('./routes/codeExecutor');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Handles JSON parsing

// Test route to verify the server is running
app.get('/test', (req, res) => {
    res.send('Test endpoint is working!');
});

// Use the code executor router under the '/api' path
app.use('/api', codeExecutorRouter);

// Catch-all route for any undefined routes (optional)
app.use((req, res) => {
    res.status(404).send('404: Route not found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
