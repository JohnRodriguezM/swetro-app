// eslint-disable-next-line @typescript-eslint/naming-convention
import axios from "axios";

const baseURL = "http://localhost:3000/";

// const baseURL = "http://70.30.6.237/api/"

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  (request) => {
    // Intercept the request and log the method and URL
    console.log(
      `%c ${request?.method?.toUpperCase()} ${request.url}`,
      "color: blue; font-weight: bold;"
    );
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
