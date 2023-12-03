const http = require('http');

const server = http.createServer((req, res) => {
  // Get the URL from the request object
  const url = req.url;

  // Set the content type to plain text
  res.setHeader('Content-Type', 'text/plain');

  // Check the requested URL and send the appropriate response
  if (url === '/home') {
    res.end('Welcome home');
  } else if (url === '/about') {
    res.end('Welcome to About Us page');
  } else if (url === '/node') {
    res.end('Welcome to my Node.js project');
  } else {
    // If the URL doesn't match any of the specified routes
    res.statusCode = 404;
    res.end('404 Not Found');
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
