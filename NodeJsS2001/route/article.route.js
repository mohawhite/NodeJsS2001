const express = require('express');
const router = express.Router();
const articleController = require('../controller/article.controller');

router.get('/getArticle', articleController.findAll)
router.post('/postArticle', articleController.create)

module.exports = router;