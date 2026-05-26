const express = require('express');
const KommentarController = require('../controller/kommentarController');

const router = express.Router();

router.post('/hendelser/:hendelseId/kommentarer', KommentarController.create);
router.get('/hendelser/:hendelseId/kommentarer', KommentarController.getByHendelse);
router.delete('/kommentarer/:id', KommentarController.delete);

module.exports = router;
