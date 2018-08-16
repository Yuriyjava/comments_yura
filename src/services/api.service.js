// import { API_URL } from '@/common/config'
import Axios from "axios";

import Vue from "vue";

let axios = Axios.create(),
  V = Vue.prototype;

let notify = function (req, options = {
  success: "Operation successfully"
}) {
  V.$snotify.async(
    /* 'Saving data',  */
    "Processing....",
    () =>
    new Promise((resolve, reject) => {
      req.then(() =>
        resolve({
          title: "Success!",
          body: options.success || "",
          config: {
            timeout: 1000,
            closeOnClick: true,
            pauseOnHover: true
          }
        })
      );

      req.catch(err => {
        let msg =
          err instanceof Error ?
          err.message :
          "We got an error!";
        reject({
          title: "Error!",
          body: msg,
          config: {
            timeout: 1000,
            closeOnClick: true,
            pauseOnHover: true
          }
        });
      });
    }), {
      backdrop: 0.5
    }
  );
};

let getNotification = (req, o) => {
  if (!o) return req;
  switch (true) {
    case !!o.notify:
      notify(req, {
        success: o.notify
      });
      break;
    case !!o.processing:
      break;

    default:
  }

  return req;
};

let API = {
  get(url, o = null) {
    let req = axios.get.apply(axios, arguments);

    return getNotification(req, o);
  },

  post(url, data, o = null) {
    let req = axios.post.apply(axios, arguments);

    return getNotification(req, o);
  },

  delete(batch, o = null) {
    let req = Axios.delete.apply(axios, arguments);

    return getNotification(req, o);
  },
  put(batch, o = null) {
    let req = Axios.put.apply(axios, arguments);

    return getNotification(req, o);
  },

};

axios.defaults.baseURL = "http://comments.stage.itsvit.org/api";






export default API;
