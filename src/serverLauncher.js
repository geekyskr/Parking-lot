const http = require('http');
const app = require("../src/routes/routes");

const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port, (req, res) => {
  console.log("Server is running on port " + port);
});