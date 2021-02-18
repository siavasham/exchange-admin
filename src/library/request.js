import axios from "axios";
import { setup } from "axios-cache-adapter";
export const baseUrl = "http://localhost:8000/api/";

const axiosBase = setup({
  axios,
  baseURL: baseUrl,
  timeout: 5000,
  validateStatus: function () {
    return true;
  },
});

export const get = async (path, opt) => {
  let header = {};
  try {
    if (opt?.cache) {
      header.cache = {
        maxAge: 10 * 60 * 1000,
      };
    }
    const res = await axiosBase.get(path, header);
    const { data } = await res;
    return data;
  } catch (error) {
    window.postMessage({ notify: ["error", "try-later"] }, "*");
    return await 0;
  }
};

export const post = async (path, items, opt) => {
  let header = {};
  try {
    if (opt?.cache) {
      header.cache = {
        maxAge: 10 * 60 * 1000,
      };
    }
    let form = new FormData();
    for (let key in items) {
      form.append(key, items[key]);
    }
    const res = axiosBase.post(path, form, header);
    const { data } = await res;
    return data;
  } catch (error) {
    window.postMessage({ notify: ["error", "try-later"] }, "*");
    return await 0;
  }
};

export default { get, post };
