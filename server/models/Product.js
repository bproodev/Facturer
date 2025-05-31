// server/models/product.js

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: { // Nom / désignation
      type: DataTypes.STRING,
      allowNull: false
    },
    unitPrice: { // Prix unitaire
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    unit: { // Unité (ex: sac, kg, litre)
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Company, { // Un produit appartient à une entreprise
      foreignKey: 'companyId',
      as: 'company'
    });
    Product.hasMany(models.InvoiceItem, { // Un produit peut être dans plusieurs lignes de facture
      foreignKey: 'productId',
      as: 'invoiceItems'
    });
  };

  return Product;
};