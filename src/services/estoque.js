import { http } from './config';

export default {
  getAllIngredientes: () => {
    return http.get('ingredientes/getAll');
  },

  createIngrediente: (ingrediente) => {
    return http.post('ingrediente/cadastrar', ingrediente);
  },

  updateIngrediente: (id, data) => {
    return http.put(`/ingrediente/atualizar/${id}`, data);
  },

  deleteIngrediente: (id) => {
    return http.delete(`/ingrediente/deletar/${id}`);
  },
};
