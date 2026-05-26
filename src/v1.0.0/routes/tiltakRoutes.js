const express = require('express');
const TiltakController = require('../controller/tiltakController');

const router = express.Router();

router.post('/hendelser/:hendelseId/tiltak', TiltakController.add);
router.get('/hendelser/:hendelseId/tiltak', TiltakController.getByHendelse);
router.delete('/tiltak/:id', TiltakController.delete);

module.exports = router;
