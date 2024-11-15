// trackingServer.js
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3001;
// Serve the tracking pixel route
app.get('/track', (req, res) => {
  // Extract query parameters
  console.log("req", req.query)
  const recipient = req.query.recipient ? decodeURIComponent(req.query.recipient) : 'unknown';
  const trackingId = req.query.trackingId || 'unknown';
  // Log the tracking info to a file or database
  const logEntry = `Recipient: ${recipient}, Tracking ID: ${trackingId}, Timestamp: ${new Date().toISOString()}\n`;
  fs.appendFileSync('tracking_logs.txt', logEntry);
  console.log(`Tracking pixel loaded by ${recipient} with ID ${trackingId}`);
  // Return a 1x1 transparent PNG as the tracking pixel
  const pixel = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgMBAxrHkdQAAAAASUVORK5CYII=',
    'base64'
  );
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': pixel.length,
  });
  res.end(pixel);
});
app.get('/ping', (req, res) => {
  res.send('pong');
});
// Start the server
app.listen(PORT, () => {
  console.log(`Tracking server running on http://localhost:${PORT}/track`);
});
