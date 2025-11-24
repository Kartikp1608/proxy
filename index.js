const corsAnywhere = require("cors-anywhere");

corsAnywhere.createServer({
  originWhitelist: [], 
}).listen(8080, () => {
  console.log("Proxy running on port 8080");
});
