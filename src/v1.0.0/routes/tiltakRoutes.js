import express from 'express';
import TiltakController from '../controller/tiltakController.js';

const router = express.Router();

router.post('/hendelser/:hendelseId/tiltak', TiltakController.add);
router.get('/hendelser/:hendelseId/tiltak', TiltakController.getByHendelse);
router.delete('/tiltak/:id', TiltakController.delete);

export default router;