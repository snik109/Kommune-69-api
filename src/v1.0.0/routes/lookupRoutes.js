import express from 'express';
import LookupController from '../controller/lookupController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/statuser', authenticateToken, LookupController.getStatuses);
router.get('/prioriteringer', authenticateToken, LookupController.getPriorities);
router.get('/kategorier', authenticateToken, LookupController.getCategories);
router.get('/roller', authenticateToken, LookupController.getRoles);

export default router;
