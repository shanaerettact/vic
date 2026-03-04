import axios from "axios";
import qs from "qs";

const instance = axios.create({
  baseURL: "/",
  timeout: 30000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export function baseAjax(method, url, data) {
  return new Promise((resolve, reject) => {
    instance({
      method: method,
      url: url,
      data: qs.stringify(data),
    })
      .then((res) => {
        if (res.data.code == 5) {
          location.href = "/m/#/safeCenter"
        }
         if (res.data.code == 6) {
          location.href = "/m/#/bankAccount"
         }
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

export function baseAjaxImage(method, url, data) {
  return new Promise((resolve, reject) => {
    instance({
      method: method,
      url: url,
      data: data,
      contentType: false,
      cache: false,
      processData: false,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
