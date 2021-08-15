const { Model, DataTypes } = require("sequelize");


class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      is_admin: DataTypes.STRING,
    },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Sale, {foreignKey:"user_id",as:"purchases"})
   }
}

module.exports = User;
