// server/models/invoice.js

module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
    invoiceNumber: { // Numéro automatique (Mais peut être modifier)
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    invoiceDate: { // Date de facture
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    reference: { // Référence
      type: DataTypes.STRING,
      allowNull: true
    },
    subTotal: { // Sous-total
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    totalHT: { // Prix HT
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    tvaAmount: { // TVA (19.25%)
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    totalTTC: { // Prix TTC
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    downPayment: { // Acompte
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.00
    },
    discount: { // Remise (facultatif)
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.00
    },
    netToPay: { // Net a Paye
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    amountInWords: { // Montant en lettres (optionnel ou automatique)
      type: DataTypes.STRING,
      allowNull: true
    },
    footerText: { // Texte de bas de facture personnalisable
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  Invoice.associate = (models) => {
    Invoice.belongsTo(models.Company, { // Une facture est émise par une entreprise
      foreignKey: 'companyId',
      as: 'issuerCompany'
    });
    Invoice.belongsTo(models.Client, { // Une facture est destinée à un client
      foreignKey: 'clientId',
      as: 'customer'
    });
    Invoice.hasMany(models.InvoiceItem, { // Une facture a plusieurs lignes de facture
      foreignKey: 'invoiceId',
      as: 'items'
    });
  };

  return Invoice;
};