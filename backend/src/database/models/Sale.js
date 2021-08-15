const { Model, DataTypes } = require("sequelize");


class Sale extends Model {
	static init(sequelize) {
		super.init({
			total_items: DataTypes.INTEGER,
			total_value: DataTypes.FLOAT,
			sale_date: DataTypes.DATE,
		},
			{
				sequelize,
			});
	}

	static associate(models) {
		this.belongsTo(models.User,{foreignKey:"user_id",as:"buyer"});
		this.hasMany(models.SaleItem,{foreignKey:"sale_id",as:"sale_item"})
	 }
}

module.exports = Sale;
