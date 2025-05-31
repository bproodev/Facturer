// server/models/client.js

module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    name: { // Nom (Personne Physique ou Entreprise)
      type: DataTypes.STRING,
      allowNull: false
    },
    address: { // Adresse
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: { // Téléphone
      type: DataTypes.STRING,
      allowNull: true
    },
    email: { // Email (facultatif)
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    logo: { // Logo facultatif
      type: DataTypes.STRING, // Stocker l'URL ou le chemin du logo
      allowNull: true
    }
  });

  Client.associate = (models) => {
    Client.hasMany(models.Invoice, {
      foreignKey: 'clientId',
      as: 'invoices'
    });
  };

  return Client;
};