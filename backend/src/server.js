require("./database");
const express = require("express");
const server = express();

server.use(express.json());

server.use("/auth", require("./routes/auth"));
server.use("/user", require("./routes/user"));
server.use("/product", require("./routes/product"));
server.use("/sale", require("./routes/sale"));

server.listen(4000, () => console.log("Servidor rodando..."));
