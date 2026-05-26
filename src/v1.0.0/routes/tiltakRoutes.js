import express from 'express';
import TiltakController from '../controller/tiltakController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:hendelseId/tiltak', authenticateToken, authorizeRole(['admin', 'management']), TiltakController.add);
router.get('/:hendelseId/tiltak', authenticateToken, authorizeRole(['admin', 'management']), TiltakController.getByHendelse);
router.delete('/:id', authenticateToken, authorizeRole(['admin']), TiltakController.delete);

export default router;