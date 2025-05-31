// server/models/invoiceitem.js

module.exports = (sequelize, DataTypes) => {
  const InvoiceItem = sequelize.define('InvoiceItem', {
    quantity: { // quantité
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unitPrice: { // prix unitaire (pour cette ligne spécifique, car il peut changer)
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    totalPrice: { // total pour la ligne (quantité * prix unitaire)
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  });

  InvoiceItem.associate = (models) => {
    InvoiceItem.belongsTo(models.Invoice, { // Une ligne de facture appartient à une facture
      foreignKey: 'invoiceId',
      as: 'invoice'
    });
    InvoiceItem.belongsTo(models.Product, { // Une ligne de facture fait référence à un produit
      foreignKey: 'productId',
      as: 'product'
    });
  };

  return InvoiceItem;
};