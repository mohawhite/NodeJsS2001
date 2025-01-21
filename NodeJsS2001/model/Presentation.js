var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PresentationSchema = new Schema({
    title: String,
    description: {
        type: String,
        required: true
    },
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
})

module.exports = mongoose.model('Presentation', PresentationSchema);