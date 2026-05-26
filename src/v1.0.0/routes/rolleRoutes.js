import express from 'express';
import RolleController from '../controller/rolleController.js';

const router = express.Router();

router.post('/brukere/:brukerId/roller', RolleController.assign);
router.delete('/brukere/:brukerId/roller/:rolleId', RolleController.remove);
router.get('/brukere/:brukerId/roller', RolleController.getRolesForUser);

export default router;
