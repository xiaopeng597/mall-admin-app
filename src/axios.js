import axios from 'axios';
import store from '@/store';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});

instance.interceptors.request.use((config) => {
  if (config.url.includes('/passport')) {
    return config;
  }
  return {
    ...config,
    params: {
      ...config.params,
      appkey: store.state.user.appkey,
    },

  };

  console.log(config);
  return config;
}, (error) => Promise.reject(error));

instance.interceptors.response.use((response) => {
  console.log(response);
  if (response.data.status === 'fail') {
  	return Promise.reject(response.data.msg);
  }
  	return response.data.data;
}, (error) => Promise.reject(error));

export default instance;
