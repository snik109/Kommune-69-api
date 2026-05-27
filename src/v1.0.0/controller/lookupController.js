import LookupService from '../services/lookupService.js';

const LookupController = {
  // GET /api/lookup/statuser
  async getStatuses(req, res, next) {
    try {
      const result = await LookupService.getAllStatuses();
      res.status(200).json({ statuser: result });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/lookup/prioriteringer
  async getPriorities(req, res, next) {
    try {
      const result = await LookupService.getAllPriorities();
      res.status(200).json({ prioriteringer: result });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/lookup/kategorier
  async getCategories(req, res, next) {
    try {
      const result = await LookupService.getAllCategories();
      res.status(200).json({ kategorier: result });
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