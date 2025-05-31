// Utilitaire pour formater les dates
export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR');
}
