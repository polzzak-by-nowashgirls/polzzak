import axios from 'axios';

export const client = axios.create({
  baseURL: `/tourapi/${import.meta.env.VITE_OPEN_API_BASE_URL}`,
  params: {
    serviceKey: import.meta.env.VITE_OPEN_API_KEY,
    MobileOS: 'ETC',
    MobileApp: 'polzzak',
    _type: 'json',
  },
});
