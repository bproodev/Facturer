// Exemple de migration Sequelize pour Company
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address: Sequelize.STRING,
      email: Sequelize.STRING,
      phone: Sequelize.STRING,
      logo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      userId: { // 👈 Add this line
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // 👈 Make sure the table name is correct
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Companies');
  }
};
