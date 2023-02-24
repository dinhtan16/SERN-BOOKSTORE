

'use strict';
/** @type {import('sequelize-cli').Migration} */
// import 'sequelize-cli'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        
      },
      totalPrice: {
        type: Sequelize.FLOAT,defaultValue:0
      },
      userId: {
        type: Sequelize.STRING,
      
      },
      bookId: {
        type: Sequelize.STRING,
      
      },
      totalQuantity: {
        type: Sequelize.STRING,defaultValue:0
      
      },
      createdAt: {
        allowNull: false,
        type: 'TIMESTAMP',defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: 'TIMESTAMP',defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')

      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Carts');
  }
};