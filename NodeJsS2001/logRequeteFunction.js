const fs = require('fs');

/**
 * Enregistre les détails des requêtes HTTP dans un fichier log.
 * @param {string} fichier - Le chemin du fichier où écrire les logs.
 * @param {Object} req - L'objet représentant la requête (Request).
 */
exports.logRequete = (fichier, req) => {
    // Vérifie si le fichier de log existe, sinon le crée
    if (!fs.existsSync(fichier)) {
        fs.writeFileSync(fichier, '', 'utf8'); // Crée un fichier vide
        console.log(`Le fichier ${fichier} a été créé.`);
    }

    // Prépare le message de log avec la méthode HTTP et l'URL
    const logMessage = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;

    // Ajoute le message au fichier
    fs.appendFile(fichier, logMessage, (err) => {
        if (err) {
            console.error(`Erreur d'écriture dans le fichier ${fichier}:`, err);
        }
    });
};
