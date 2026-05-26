import express from 'express';
import BrukerController from '../controller/brukerController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', authenticateToken, authorizeRole(['admin']), BrukerController.register);
router.post('/login', BrukerController.login);
router.post('/logout', BrukerController.logout);
router.get('/', authenticateToken, authorizeRole(['admin']), BrukerController.getAll);
router.get('/:id', authenticateToken, authorizeRole(['admin']), BrukerController.getById);
router.get('/:id/roller', authenticateToken, authorizeRole(['admin']), BrukerController.getWithRoles);
router.put('/:id', authenticateToken, authorizeRole(['admin']), BrukerController.update);
router.delete('/:id', authenticateToken, authorizeRole(['admin']), BrukerController.delete);

export default router;
