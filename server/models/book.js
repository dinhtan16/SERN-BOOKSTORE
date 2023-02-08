'use strict';
// const {
//   Model
// } = require('sequelize');
import {Model} from 'sequelize'

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsTo(models.Category, {
        foreignKey: "category_code",
        targetKey:'code',
        as: "cateCode",
      });
  
      Book.belongsTo(models.Image,{foreignKey:'image_sId',targetKey:'id',as:'imgDataUrl'})
      Book.hasOne(models.Cart,{foreignKey:"bookId",as:"bookIdData"})

    }
  }
  Book.init({
    title: DataTypes.STRING,
    price: DataTypes.FLOAT,
    available: DataTypes.INTEGER,
    imageUrl:DataTypes.STRING,
    description:DataTypes.TEXT,
    category_code:DataTypes.STRING,
    image_sId:DataTypes.INTEGER,
    priceCode:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};