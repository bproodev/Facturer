// Ebauche de génération de PDF (à compléter)
const fs = require('fs');
const path = require('path');

exports.generateInvoicePDF = (invoiceData, outputPath) => {
  // À remplacer par une vraie génération PDF (html-pdf, pdfkit, etc.)
  fs.writeFileSync(outputPath, `Facture: ${JSON.stringify(invoiceData, null, 2)}`);
};
