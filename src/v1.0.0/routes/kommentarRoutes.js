import express from 'express';
import KommentarController from '../controller/kommentarController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:hendelseId/kommentarer', authenticateToken, authorizeRole(['admin', 'management']), KommentarController.create);
router.get('/:hendelseId/kommentarer', authenticateToken, authorizeRole(['admin', 'management']), KommentarController.getByHendelse);
router.delete('/:id', authenticateToken, authorizeRole(['admin']), KommentarController.delete);

export default router;
