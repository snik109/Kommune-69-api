const express = require('express');
const HendelseController = require('../controller/hendelseController');

const router = express.Router();

router.post('/hendelser', HendelseController.create);
router.get('/hendelser', HendelseController.getAll);
router.get('/hendelser/:id', HendelseController.getById);
router.patch('/hendelser/:id/status', HendelseController.updateStatus);
router.patch('/hendelser/:id/prioritering', HendelseController.updatePriority);
router.patch('/hendelser/:id/ansvarlig', HendelseController.updateResponsible);
router.delete('/hendelser/:id', HendelseController.delete);
router.get('/hendelser/:id/kategorier', HendelseController.getCategories);
router.post('/hendelser/:id/kategorier', HendelseController.addCategory);
router.delete('/hendelser/:id/kategorier/:kategoriId', HendelseController.removeCategory);

module.exports = router;
