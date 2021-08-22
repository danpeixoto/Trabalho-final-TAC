const restify = require("restify");
const productRouter = require("./routers/product");
const connectDB = require("./config/db");
const corsMiddleware = require("restify-cors-middleware2");
const server = restify.createServer();

const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ["http://localhost:3000"],
  allowHeaders: ["x-auth-token"],
});

connectDB();
server.pre(cors.preflight);
server.use(restify.plugins.bodyParser());
server.use(cors.actual);
productRouter(server);

server.listen(5000, () => {
  console.log("Servidor funcionando...");
});
