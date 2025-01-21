const fs = require('fs');
const path = require("node:path");
exports.writelog = (fichier, message) => {
    if (!fs.existsSync(fichier)) {
        fs.writeFileSync(fichier, '', 'utf8');
        console.log("le fichier a été créé");
    }
    const logMessage = `${new Date().toISOString()} - ${message} \n`;
    fs.appendFile(fichier, logMessage, (err) =>{
        if(err) {
            console.log('ça ne fonctionne pas',err);
        }
    })
}

exports.rotateLog = () => {
    const MAX_LOG_SIZE = 5 * 1024 * 1024; //5MO

    const stats = fs.statSync('requests.log');

    if (stats.size >= MAX_LOG_SIZE) {
        const unique = `resquests_${Date.now()}.log}`;
        fs.renameSync('requests.log', path.join(__dirname, unique));

        fs.writeFileSync('requests.log', '', 'utf8');

        console.log('Rotation effectuer');
    }
}