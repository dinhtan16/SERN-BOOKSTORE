'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Category.hasMany(models.Book,{foreignKey:'category_code',targetKey:'code',as:'cateCode'})
    
    Category.hasMany(models.Book, {foreignKey:"category_code", as: "cateCode" });
    
    
    }
  }
  Category.init({
        code:DataTypes.STRING,
        value:{
          type:DataTypes.STRING,
          set(value){           // hàm get xử lí trc khi trả về, set trc khi gửi đi
            this.setDataValue('value',value.charAt(0).toUpperCase() + value.slice(1))
          }
        }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};