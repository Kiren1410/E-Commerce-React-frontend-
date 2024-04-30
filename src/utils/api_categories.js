import axios from "axios";

const API_URL =
  "http://localhost:5000";

  export const getCategories = async () => {
    try {
        let params = {};
        const queries = new URLSearchParams(params);
        const response = await axios.get(API_URL + "/categories" + queries.toString());
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
