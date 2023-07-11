import axios from "./axios";

export const getProductModel = () => axios.get(`/admin/productModels`);
