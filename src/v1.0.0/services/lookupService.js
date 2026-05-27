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
  
  async createCategory({ navn, beskrivelse }) {
    if (!navn) {
      const err = new Error('Kategorienavn er påkrevd.');
      err.status = 400;
      throw err;
    }
    return LookupRepository.createCategory({ navn, beskrivelse });
  },

  async getAllRoles() {
    return LookupRepository.getAllRoles();
  },
};

export default LookupService;