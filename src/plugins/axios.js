import axios from "axios";
// var qs = require("qs");

function errorNotification(title, msg) {
  console.error("error_alert", {
    title: title,
    message: msg,
  });
}

function ErrorHandler(error) {
  if (error.message.startsWith("timeout")) {
    errorNotification(i18n.t("timeout"));
  }
  if (error.response) {
    const _error = error.response.data;
    switch (error.response.status) {
      case 400:
        errorNotification("Bad Request", _error);
        break;
      case 401:
        errorNotification("Unauthorized", _error);
        break;
      case 403:
        errorNotification("Forbidded", _error.message);
        break;
      case 404:
        errorNotification("Not Found", _error.message);
        break;
      case 422:
        errorNotification("Unprocessable Entity", _error.message);
        break;
      case 500:
        errorNotification("Internal Server Error", _error.message);
        break;
      default:
        break;
    }
  }
}
const init = {
  request(method, url, params, data) {
    const config = {
      baseURL: "https://dummyjson.com/",
      timeout: 120000,
      url: url,
      method: method,
    };
    // if (localStorage.getItem("token")) {
    //   config.headers = {
    //     Authorization: "Bearer " + localStorage.getItem("token"),
    //   };
    // }
    if (data) config.data = data;

    if (params) {
      config.params = params;
      // config.paramsSerializer = function (params) {
      //   return qs.stringify(params, { encodeValuesOnly: true });
      // };
    }

    const result = axios(config);

    return new Promise((resolve, reject) => {
      result
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          ErrorHandler(error);
          reject(error);
        });
    });
  },
  get(url, params) {
    return this.request("GET", url, params, undefined);
  },
  post(url, data, params) {
    return this.request("POST", url, params, data);
  },
  patch(url, data, params) {
    return this.request("PATCH", url, params, data);
  },
  put(url, data, params) {
    return this.request("PUT", url, params, data);
  },
  remove(url, params) {
    return this.request("DELETE", url, params, undefined);
  },
};

export default init;
