const express = require('express');
const router = express.Router();
const presentationController = require('../controller/presentation.controller');

router.get('/GetPresentation', presentationController.getAllPresentations);

router.post('/Postpresentation', presentationController.createPresentation);

router.put('/:id', presentationController.updatePresentation);

module.exports = router;
