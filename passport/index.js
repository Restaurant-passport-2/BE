require("./serial");
const fs = require("fs");
const path = require("path");

const normalizedPath = path.join(__dirname, "strategy").normalize();
fs.readdirSync(normalizedPath).forEach(function(file) {
  require(`${normalizedPath}\\${file}`);
});
