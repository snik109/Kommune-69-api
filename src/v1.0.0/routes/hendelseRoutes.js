import express from 'express';
import HendelseController from '../controller/hendelseController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, HendelseController.create);
router.get('/', authenticateToken, HendelseController.getAll);
router.get('/:id', authenticateToken, HendelseController.getById);
router.patch('/:id/status', authenticateToken, authorizeRole(['admin', 'management']), HendelseController.updateStatus);
router.patch('/:id/prioritering', authenticateToken, authorizeRole(['admin', 'management']), HendelseController.updatePriority);
router.patch('/:id/ansvarlig', authenticateToken, authorizeRole(['admin', 'management']), HendelseController.updateResponsible);
router.delete('/:id', authenticateToken, authorizeRole(['admin']), HendelseController.delete);
router.get('/:id/kategorier', authenticateToken, HendelseController.getCategories);
router.post('/:id/kategorier', authenticateToken, authorizeRole(['admin', 'management']), HendelseController.addCategory);
router.delete('/:id/kategorier/:kategoriId', authenticateToken, authorizeRole(['admin']), HendelseController.removeCategory);

export default router;