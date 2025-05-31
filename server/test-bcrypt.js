// server/test-bcrypt.js

const bcrypt = require('bcryptjs');

async function testBcrypt() {
  const plainPassword = 'Pass_123'; // Le mot de passe que vous utilisez pour le test
  const saltRounds = 10;

  try {
    // 1. Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    console.log('Mot de passe en clair pour le test:', plainPassword);
    console.log('Mot de passe haché généré:', hashedPassword);

    // 2. Comparer le mot de passe en clair avec le hachage
    const isMatch1 = await bcrypt.compare(plainPassword, hashedPassword);
    console.log('Comparaison (clair vs haché généré) - Devrait être TRUE:', isMatch1);

    // 3. Comparer avec le hachage que vous avez dans votre console pour un utilisateur existant
    const storedHashFromConsole = '$2a$10$teTU9kELwaEDT87ZopfCWewEGz.apLWwzwUwVheURfEWYYnk7yTfK';
    const isMatch2 = await bcrypt.compare(plainPassword, storedHashFromConsole);
    console.log('Comparaison (clair vs haché de la DB/console) - Devrait être TRUE:', isMatch2);

    // 4. Test avec un faux mot de passe
    const isMatchFalse = await bcrypt.compare('Wrong_Pass', hashedPassword);
    console.log('Comparaison (faux vs haché) - Devrait être FALSE:', isMatchFalse);

  } catch (error) {
    console.error('Erreur lors du test de bcrypt:', error);
  }
}

testBcrypt();