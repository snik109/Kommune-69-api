import express from 'express';
import LookupController from '../controller/lookupController.js';

const router = express.Router();

router.get('/lookup/statuser', LookupController.getStatuses);
router.get('/lookup/prioriteringer', LookupController.getPriorities);
router.get('/lookup/kategorier', LookupController.getCategories);
router.get('/lookup/roller', LookupController.getRoles);

export default router;
