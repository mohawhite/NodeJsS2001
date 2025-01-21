var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Vérifiez si le modèle existe déjà avant de le déclarer
var ArticleSchema = new Schema({
    title: String,
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.models.Article || mongoose.model('Article', ArticleSchema);
