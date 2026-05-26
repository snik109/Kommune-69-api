const LookupRepository = require('../repositories/lookupRepository');

const LookupService = {
  async getAllStatuses() {
    return LookupRepository.getAllStatuses();
  },

  async getAllPriorities() {
    return LookupRepository.getAllPriorities();
  },

  async getAllCategories() {
    return LookupRepository.getAllCategories();
  },

  async getAllRoles() {
    return LookupRepository.getAllRoles();
  },
};

module.exports = LookupService;