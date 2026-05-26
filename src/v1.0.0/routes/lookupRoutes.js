const express = require('express');
const LookupController = require('../controller/lookupController');

const router = express.Router();

router.get('/lookup/statuser', LookupController.getStatuses);
router.get('/lookup/prioriteringer', LookupController.getPriorities);
router.get('/lookup/kategorier', LookupController.getCategories);
router.get('/lookup/roller', LookupController.getRoles);

module.exports = router;
