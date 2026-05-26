import express from 'express';
import BrukerController from '../controller/brukerController.js';

const router = express.Router();

router.post('/brukere/register', BrukerController.register);
router.post('/brukere/login', BrukerController.login);
router.post('/brukere/logout', BrukerController.logout);
router.get('/brukere', BrukerController.getAll);
router.get('/brukere/:id', BrukerController.getById);
router.get('/brukere/:id/roller', BrukerController.getWithRoles);
router.put('/brukere/:id', BrukerController.update);
router.delete('/brukere/:id', BrukerController.delete);

export default router;
