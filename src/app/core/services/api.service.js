import axios from "axios";
import { ENV } from "../../../config/env";
import AuthHelper from "../helpers/authHelper";

export class ApiService {
  axiosInstance;
  authHelper;

  constructor() {
    this.authHelper = new AuthHelper();
    // Init axiosInstance
    this.axiosInstance = axios.create({
      baseURL: ENV.apiBaseUrl,
      // Common header
      headers: {
        "Content-Type": "application/json",
        ...this.authHelper.defaultHeader(),
      },
    });
    this._setInterceptors();
  }

  createURL(uri) {
    let paramsUrl;
    if (typeof uri[uri.length - 1] !== "string") {
      paramsUrl = uri.pop();
      let url = uri.join("/");
      Object.keys(paramsUrl).forEach((x) => {
        url = url.replace(`:${x}`, paramsUrl[x]);
      });
      return url;
    } else {
      return uri.join("/");
    }
  }

  get(uri, params = {}, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.get(this.createURL(uri), {
        params,
        ...moreConfigs,
      });
      this._handleRespond(request, resolve, reject);
    });
  }

  post(uri, data = {}, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.post(
        this.createURL(uri),
        data,
        moreConfigs
      );
      this._handleRespond(request, resolve, reject);
    });
  }

  put(uri, data = {}, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.put(
        this.createURL(uri),
        data,
        moreConfigs
      );
      this._handleRespond(request, resolve, reject);
    });
  }

  delete(uri, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.delete(
        this.createURL(uri),
        moreConfigs
      );
      this._handleRespond(request, resolve, reject);
    });
  }

  multipeGets(apiRequests) {
    const apiReqs = apiRequests.map((v) => this.axiosInstance.get(v));
    return new Promise((resolve, reject) => {
      axios
        .all(apiReqs)
        .then((resp) => {
          resolve(resp.map((v) => v.data));
        })
        .catch((err) => reject(err));
    });
  }

  _handleRespond(request, resolve, reject) {
    return request
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  }

  _setInterceptors() {
    this.axiosInstance.interceptors.request.use((request) =>
      this.authHelper.setAuthHeader(request)
    );
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => this._handleError(error)
    );
  }

  async _handleError(error) {
    // Detect refresh Token
    // if (error.isAxiosError && error.response?.status === 401) {
    //   const originalRequest = error.config;
    //   console.log(error)
    //   const req = await this.authHelper.handleRefreshToken(originalRequest);
    //   return this.axiosInstance(req);
    // }

    // Make error model before promise
    if (error.isAxiosError && error.response) {
      // Axios error
      return Promise.reject({
        msg: error.message,
        name: error.name,
        stack: error.stack,
        response: error.response,
      });
    } else {
      // Default | Network errors | CORS | ...
      return Promise.reject({});
    }
  }
}
