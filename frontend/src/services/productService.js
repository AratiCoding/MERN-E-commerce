import API from "./api";

export const getProducts = (params) =>
  API.get("/products", { params });