const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors());

// Add JSON parsing middleware
app.use(express.json());

// Debug logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Test route
app.get('/', (req, res) => {
  console.log('Sending response');
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: 'Hello World' }));
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const server = app.listen(8080, '127.0.0.1', () => {
  console.log('Test server running on port 8080');
});

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});
