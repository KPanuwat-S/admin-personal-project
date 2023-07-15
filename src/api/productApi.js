import axios from "./axios";

// Get
export const getProductModel = () => axios.get(`/admin/productModels`);
export const getOneProductModel = (id) =>
  axios.get(`/admin/productModels/${id}`);

export const getProductCategory = () => axios.get(`/admin/categories`);
export const getProductModelItems = (id) => axios.get(`/products/${id}`);

// Creatte
export const createProductItem = (id, data) =>
  axios.post(`/admin/productModels/productItems/${id}`, data);

export const createProductModel = (data) =>
  axios.post(`/admin/productModels`, data);

// Edit

export const editProductModel = (id, data) =>
  axios.patch(`/admin/productModels/${id}`, data);

// Delete
export const deleteProductModel = (id) =>
  axios.delete(`/admin/productModels/${id}`);

export const deleteProductItem = (id, colorId) =>
  axios.delete(`/admin/productModels/productItem/${id}`, {
    data: { colorId: colorId },
  });
