const Article = require("../model/Article");

exports.findAll= async (req,res)=>{
    let articles = await Article.find();

    res.json(articles);
}

exports.create = async (req, res) => {
    try {
        // Création d'un nouvel article à partir des données envoyées dans la requête
        const newArticle = new Article({
            title: req.body.title,
            description: req.body.description
        });

        // Enregistrement dans la base de données
        const savedArticle = await newArticle.save();

        res.status(201).json(savedArticle);  // Répondre avec l'article créé
    } catch (err) {
        res.status(500).json({ message: 'Error creating article', error: err });
    }
};