import LookupRepository from '../repositories/lookupRepository.js';

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

export default LookupService;