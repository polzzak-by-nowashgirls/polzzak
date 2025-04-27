import axios from 'axios';

export const client = axios.create({
  baseURL: `/tourapi${import.meta.env.VITE_OPEN_API_BASE_URL}`,
});

client.interceptors.request.use((config) => {
  if (!config.url) {
    return config;
  }

  config.url = `${config.url}?serviceKey=${import.meta.env.VITE_OPEN_API_KEY}`;
  config.params = {
    ...(config.params || {}),
    MobileApp: 'polzzak',
    MobileOS: 'ETC',
    _type: 'json',
  };

  return config;
});
