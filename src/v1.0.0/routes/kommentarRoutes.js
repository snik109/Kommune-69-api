import express from 'express';
import KommentarController from '../controller/kommentarController.js';

const router = express.Router();

router.post('/hendelser/:hendelseId/kommentarer', KommentarController.create);
router.get('/hendelser/:hendelseId/kommentarer', KommentarController.getByHendelse);
router.delete('/kommentarer/:id', KommentarController.delete);

export default router;
