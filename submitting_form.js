const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile("message.txt", { encoding: "utf-8" }, (err, data) => {
      res.write("<html>");
      res.write("<head><title>Your Title Here</title></head>");
      res.write(`<body>${data}</body>`);
      res.write(
        "<body><form action='/message' method='POST'><input type='text' name='key'><button type='submit'>Submit</button></form></body>"
      );
      res.write("</html>");
      return res.end();
    });
  }
  else if (req.url === "/message" && req.method === "POST") {
    const body = [];
    req.on("data", (chunks) => {
      body.push(chunks);
    });

    req.on("end", () => {
      fs.writeFile("message.txt", Buffer.concat(body).toString().split("=")[1], (err) => {
          res.writeHead(302, { Location: "/" });
          return res.end();
        }
      );
    });
  }
});

server.listen(4000);
