const express = require('express');
const RolleController = require('../controller/rolleController');

const router = express.Router();

router.post('/brukere/:brukerId/roller', RolleController.assign);
router.delete('/brukere/:brukerId/roller/:rolleId', RolleController.remove);
router.get('/brukere/:brukerId/roller', RolleController.getRolesForUser);

module.exports = router;
