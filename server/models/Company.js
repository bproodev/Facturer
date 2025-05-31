// server/models/company.js

module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: { // Nom de l'entreprise
      type: DataTypes.STRING,
      allowNull: false
    },
    type: { // Type (SARL, SA...) - Ajouté selon le cahier des charges
      type: DataTypes.STRING,
      allowNull: true
    },
    address: { // Adresse complète
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: { // Téléphone
      type: DataTypes.STRING,
      allowNull: false
    },
    email: { // Email
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    logo: { // Upload de logo (formats: PNG, JPEG)
      type: DataTypes.STRING, // Stocker l'URL ou le chemin du logo
      allowNull: true
    }
  });

  // Définition des associations (très important pour que Sequelize sache comment lier les modèles)
  Company.associate = (models) => {
    Company.belongsTo(models.User, { // Une entreprise appartient à un utilisateur
      foreignKey: 'userId',
      as: 'owner'
    });
    Company.hasMany(models.Invoice, { // Une entreprise peut avoir plusieurs factures
      foreignKey: 'companyId',
      as: 'invoices'
    });
    Company.hasMany(models.Product, { // Une entreprise peut avoir plusieurs produits
      foreignKey: 'companyId',
      as: 'products'
    });
  };

  return Company; // TRÈS IMPORTANT : Retournez le modèle défini
};