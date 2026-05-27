import LookupService from '../services/lookupService.js';

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
  
  async createCategory(req, res, next) {
    try {
      const { navn, beskrivelse } = req.body;
      const id = await LookupService.createCategory({ navn, beskrivelse });
      res.status(201).json({
        id,
        navn,
        beskrivelse,
      });
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

export default LookupController;