const restify = require("restify");
const productRouter = require("./routers/product");
const connectDB = require("./config/db");
const cors = require("cors");
const server = restify.createServer();

connectDB();

server.use(restify.plugins.bodyParser());
server.use(cors());

productRouter(server);

server.listen(5000, () => {
  console.log("Servidor funcionando...");
});
