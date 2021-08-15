const { Model, DataTypes } = require("sequelize");


class SaleItem extends Model {
	static init(sequelize) {
		super.init({
			amount: DataTypes.INTEGER,
			value: DataTypes.FLOAT,
		},
			{
				sequelize,
			});
	}

	static associate(models) {
		this.belongsTo(models.Sale,{foreignKey:"sale_id",as:"sale"});
		this.belongsTo(models.Product,{foreignKey:"product_id",as:"product"});
	 }
}

module.exports = SaleItem;
