
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

const buildPath = path.join(__dirname, '../client/build');

// Serve the static files from the React app
app.use(express.static(buildPath));

// Handle requests to the root path by sending index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// Handles any other requests that don't match static files or the root
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
