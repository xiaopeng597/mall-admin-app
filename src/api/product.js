import axios from '@/axios';

export default {
  list(params) {
    return axios.get('/products/all', { params });
  },
  add(params) {
  	return axios.post('/products/add', params);
  },
  remove(params) {
  	return axios.delete(`/products/${params.id}`);
  },
  detail(id) {
  	return axios.get(`/products/${id}`);
  },
  edit(params) {
  	return axios.put('/products/edit', params);
  },
};
