import axios from "axios";

export const get = async <T>(url: string, params: object = {}): Promise<T> => {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("GET request failed:", error);
    throw new Error("Error fetching data");
  }
};

export const post = async <T>(url: string, data: object): Promise<T> => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error("POST request failed:", error);
    throw new Error("Error posting data");
  }
};
