'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoiceNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      invoiceDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      reference: {
        type: Sequelize.STRING,
        allowNull: true
      },
      subTotal: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      totalHT: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      tvaAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      totalTTC: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      downPayment: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.00
      },
      discount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.00
      },
      netToPay: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      amountInWords: {
        type: Sequelize.STRING,
        allowNull: true
      },
      footerText: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      companyId: { // Clé étrangère vers la table Companies
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Companies',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      clientId: { // Clé étrangère vers la table Clients
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Clients',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Invoices');
  }
};