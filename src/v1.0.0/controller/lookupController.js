const LookupService = require('../services/lookupService');

const LookupController = {
  // GET /api/lookup/statuser
  async getStatuses(req, res, next) {
    try {
      res.json(await LookupService.getAllStatuses());
    } catch (err) {
      next(err);
    }
  },

  // GET /api/lookup/prioriteringer
  async getPriorities(req, res, next) {
    try {
      res.json(await LookupService.getAllPriorities());
    } catch (err) {
      next(err);
    }
  },

  // GET /api/lookup/kategorier
  async getCategories(req, res, next) {
    try {
      res.json(await LookupService.getAllCategories());
    } catch (err) {
      next(err);
    }
  },

  // GET /api/lookup/roller
  async getRoles(req, res, next) {
    try {
      res.json(await LookupService.getAllRoles());
    } catch (err) {
      next(err);
    }
  },
};

module.exports = LookupController;