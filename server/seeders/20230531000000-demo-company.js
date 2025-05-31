// Exemple de seeder Sequelize pour Company
'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Companies', [
      {
        name: 'Entreprise Démo',
        type: 'SARL',
        userId: 1, // Assurez-vous que l'utilisateur avec ID 1 existe
        address: '123 rue de Paris',
        email: 'demo@entreprise.com',
        phone: '0102030405',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Companies', null, {});
  }
};
