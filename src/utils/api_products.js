import axios from "axios";

const API_URL = "http://localhost:5000";

export const getProducts = async (category, perPage, page) => {
  let params = {
    perPage: perPage,
    page: page,
  };
  if (category !== "all") params.category = category;
  const query = new URLSearchParams(params);
  // /products?perPage=4&page=1&category=Consoles
  const res = await axios.get(`${API_URL}/products?${query.toString()}`);
  return res.data;
};

export const getProduct = async (id) => {
  // to retrieve product from the API /products/:id
  const res = await axios.get(`${API_URL}/products/${id}`);
  return res.data;
};

export const addProduct = async (data) => {
  const response = await axios.post(
    `${API_URL}/products`, // url of the POST API
    JSON.stringify(data), // data you want to pass through the API in JSON format
    {
      headers: {
        "Content-Type": "application/json", //
      },
    }
  );
  return response.data;
};
export const updateProduct = async (data) => {
  const response = await axios.put(
    `${API_URL}/products/${data.id}`, // url of the PUT API
    JSON.stringify(data), // data you want to pass through the API in JSON format
    {
      headers: {
        "Content-Type": "application/json", // telling the API you are sending JSON data
      },
    }
  );
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/products/${id}`);
  return response.data;
};
