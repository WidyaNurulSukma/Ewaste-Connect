import axios from 'axios';
const API_URL = 'https://e-waste-collection.onrender.com/api/v1/order';

const cloudinaryUpload = async (data) => {
  const res = await axios.post(
    'https://api.cloudinary.com/v1_1/dkmdeg6fc/image/upload',
    data
  );
  return res;
};

const createOrder = async (orderDetails, auth) => {
  try {
    const res = await axios.post(API_URL, orderDetails, {
      headers: {
        Authorization: `Bearer ${auth}`,
        'Cache-Control': 'no-cache'
      }
    });
    return res;
  } catch (err) {
    return err.response;
  }
};

const acceptOrder = async (orderId, auth) => {
  try {
    const res = await axios.put(
      `${API_URL}/${orderId}/accept`,
      {},
      {
        headers: {
          Authorization: `Bearer ${auth}`,
          'Cache-Control': 'no-cache'
        }
      }
    );
    return res;
  } catch (err) {
    return err.response;
  }
};

const getAllOrders = async (auth) => {
  try {
    const resp = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${auth}`,
        'Cache-Control': 'no-cache'
      }
    });
    return resp;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};


const deleteOrder = async (orderId, auth) => {
  try {
    const res = await axios.delete(`${API_URL}/${orderId}`, {
      headers: {
        Authorization: `Bearer ${auth}`,
        'Cache-Control': 'no-cache'
      }
    });
    return res;
  } catch (err) {
    return err.response;
  }
};

const getUserOrders = async (auth) => {
  try {
    const resp = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${auth}`,
        'Cache-Control': 'no-cache'
      }
    });
    return resp;
  } catch (err) {
    console.error('Error fetching user orders:', err);
    return err.response;
  }
};

const getAcceptedOrders = async (auth) => {
  try {
    const resp = await axios.get(`${API_URL}/accepted`, {
      headers: {
        Authorization: `Bearer ${auth}`,
        'Cache-Control': 'no-cache'
      }
    });
    return resp;
  } catch (err) {
    console.error('Error fetching accepted orders:', err);
    return err.response;
  }
};

const updateOrderStatus = async (orderId, status, auth) => {
  try {
    const resp = await axios.put(
      `${API_URL}/${orderId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${auth}`,
          'Cache-Control': 'no-cache'
        }
      }
    );
    return resp;
  } catch (err) {
    console.error('Error updating order status:', err);
    return err.response;
  }
};

export default {
  cloudinaryUpload,
  createOrder,
  acceptOrder,
  getAllOrders,
  deleteOrder,
  getUserOrders,
  getAcceptedOrders,
  updateOrderStatus
};
