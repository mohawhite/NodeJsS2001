const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser')
const log = require('./logFunction');
const logRequetes = require('./logRequeteFunction'); // Fonction de log des requêtes
const port = process.env.PORT || 7001;
app.use(bodyParser.json());
const mongoose = require('mongoose');
const articleRouter = require('./route/article.route');
const presentationRouter = require('./route/presentation.route');
const messageEmitter = require('./event');
const fs = require("node:fs");

mongoose
    .connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> {
        console.log('Connected to MongoDB');
    })
    .catch( err => console.log('Erreur : ' + err));

// Logger pour toutes les requêtes
app.use((req, res, next) => {
    console.log('ici', req)
    log.rotateLog();
    logRequetes.logRequete('requests.log', req);  // Logue la méthode et l'URL de chaque requête
    messageEmitter.emit('message_call', req.url)
    next();  // Passe à la prochaine middleware/route
});


app.use('/article', articleRouter);
app.use('/presentation', presentationRouter);

app.listen(port, () => {
    log.writelog('server2.log', 'serveur demarré')
    console.log('Server started on port 3000');
})