const Presentation = require('../model/presentation');
const Article = require('../model/article');


exports.getAllPresentations = async (req, res) => {
    try {
        const presentation = await Presentation.find().populate('article');
        res.status(200).json(presentation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createPresentation = async (req, res) => {
    const { title, description, articleId } = req.body;

    try {
        const article = await Article.findById(articleId);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        const newPresentation = new Presentation({
            title,
            description,
            article: article._id,
        });

        const savedPresentation = await newPresentation.save();
        res.status(201).json(savedPresentation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// UPDATE a presentation
exports.updatePresentation = async (req, res) => {
    const { id } = req.params;
    const { title, description, articleId } = req.body;

    try {
        const upatedData = { title, description };
        if (articleId) {
            const article = await Article.findById(articleId);
            if (!article) {
                return res.status(404).json({ message: 'Article not found' });
            }
            updatedData.article = article._id;
        }

        const updatedPresentation = await Presentation.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedPresentation) {
            return res.status(404).json({ message: 'Presentation not found' });
        }

        res.status(200).json(updatedPresentation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
