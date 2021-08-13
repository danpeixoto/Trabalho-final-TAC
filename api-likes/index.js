const restify = require("restify");
const productRouter = require("./routers/product");
const connectDB = require("./config/db");

const server = restify.createServer();

connectDB();

server.use(restify.plugins.bodyParser());


productRouter(server);

server.listen(3000, () => {
	console.log("Servidor funcionando...");
});
