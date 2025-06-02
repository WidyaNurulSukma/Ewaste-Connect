import axios from 'axios';

const API_URL = 'https://e-waste-collection.onrender.com/api/v1/support';

const createSupportTicket = async (payload) => {
  const res = await axios.post(API_URL, payload);
  return res;
};

export default {
  createSupportTicket
};
