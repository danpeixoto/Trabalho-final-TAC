const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
const Product = require("./models/Product");
const Sale = require("./models/Sale");
const SaleItem = require("./models/SaleItem");
const User = require("./models/User");

const connection = new Sequelize(dbConfig);

User.init(connection);
Product.init(connection);
Sale.init(connection);
SaleItem.init(connection);

User.associate(connection.models);
Sale.associate(connection.models);
Product.associate(connection.models);
SaleItem.associate(connection.models);

module.exports = connection;
