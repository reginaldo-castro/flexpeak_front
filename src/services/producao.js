import { http } from './config';

export default {
  getAllProducao: () => {
    return http.get('/producao/getAll');
  },

  createProducao: (producao) => {
    return http.post('/producao/cadastrar', producao);
  },
};
