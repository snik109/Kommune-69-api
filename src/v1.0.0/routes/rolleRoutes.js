import express from 'express';
import RolleController from '../controller/rolleController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:brukerId/roller', authenticateToken, authorizeRole(['admin']), RolleController.assign);
router.delete('/:brukerId/roller/:rolleId', authenticateToken, authorizeRole(['admin']), RolleController.remove);
router.get('/:brukerId/roller', authenticateToken, RolleController.getRolesForUser);
router.post('/', authenticateToken, authorizeRole(['admin']), RolleController.create);
router.get('/', authenticateToken, RolleController.getAll);

export default router;
