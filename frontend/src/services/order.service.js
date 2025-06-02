import axios from 'axios';
const API_URL = 'https://e-waste-collection.onrender.com/api/v1/order';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

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
        Authorization: `Bearer ${auth}`
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
          Authorization: `Bearer ${auth}`
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
        Authorization: `Bearer ${auth}`
      }
    });
    return resp;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};

const reverseGeocode = async (lat, lng) => {
  try {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
    );

    if (res.data.status === 'OK') {
      const address = res.data.results[0].formatted_address;
      return address;
    } else {
      throw new Error('Geocoding failed: ' + res.data.status);
    }
  } catch (error) {
    console.error('Error in reverse geocoding:', error);
    throw error;
  }
};

const deleteOrder = async (orderId, auth) => {
  try {
    const res = await axios.delete(`${API_URL}/${orderId}`, {
      headers: {
        Authorization: `Bearer ${auth}`
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
        Authorization: `Bearer ${auth}`
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
        Authorization: `Bearer ${auth}`
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
          Authorization: `Bearer ${auth}`
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
  reverseGeocode,
  deleteOrder,
  getUserOrders,
  getAcceptedOrders,
  updateOrderStatus
};