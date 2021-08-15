const { Model, DataTypes } = require("sequelize");


class Product extends Model {
	static init(sequelize) {
		super.init({
			name: DataTypes.STRING,
			total_available: DataTypes.INTEGER,
			category: DataTypes.STRING,
			value: DataTypes.FLOAT,
		},
			{
				sequelize,
			});
	}

	static associate(models) {
		this.hasMany(models.SaleItem, {foreignKey:"product_id",as:"product_item"})
	 }
}

module.exports = Product;
