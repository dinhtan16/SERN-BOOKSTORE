'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User,{foreignKey:'userId',targetKey:'id',as:'userIdData'})
      Cart.belongsTo(models.Book,{foreignKey:'bookId',targetKey:'id',as:'bookIdData'})

    }
  }
  Cart.init({
        totalPrice:DataTypes.FLOAT,
        userId:DataTypes.INTEGER,
        bookId:DataTypes.STRING,
        totalQuantity:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};