import axios from 'axios';

import config from '../config';
import { Context } from './context';
import { Constant } from '../config/constant';
// import { CacheHandler } from '../components/cache/handler';
import { uuidv4 } from 'uuid';
//let AWS = require('aws-sdk');
// const fs = require('fs');
// const s3 = new AWS.S3({
//   accessKeyId: config.s3.access_key,
//   secretAccessKey: config.s3.secret_key,
// });

export const Common = {
  /**
   * Parse array to string
   * @param {array} array
   * @returns {string} token
   */
  parseArrayToString(array) {
    let string = '';
    array.forEach(element => {
      string += string === '' ? element.msg : '<br>' + element.msg;
    });
    return string;
  },
  /**
   * Convert any type string to uppercase the first letter "capitalize "
   * @param {string} string
   * @returns {string} string
   */
  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  /**
   * Set key and value from object to another object
   * @param {object} object
   * @param {object} response
   * @param {array} array
   * @returns {object} string
   */
  setKeyForObject(object, response, array) {
    if (array.length > 0) {
      array.forEach(element => {
        response[element] = object[element];
      });
    }
    return response;
  },

  formatErrMgs(arrErrField) {
    let arrErr = [];
    for (let key in arrErrField) {
      let row = arrErrField[key];
      arrErr.push(row.message);
    }
    return arrErr.join('<br>');
  },

  /**
   * @return bool
   */
  isSuperAdmin() {
    const context = new Context();
    const user = context.currentUser;
    const code = Constant.SUPER_ADMIN_CODE;

    return (
      Array.isArray(user.roles) &&
      user.roles.findIndex(r => r.code === code) >= 0
    );
  },

  /**
   * @param {string} token
   * @returns
   */
  async getStoreCommonByUuids(storeUuids) {
    const { data } = await axios.get(
      `${config.server.store_api}/store/list-common-uuids`,
      {
        params: { store_uuids: storeUuids },
      }
    );

    return data;
  },

  /**
   * @param {string} token
   * @returns
   */
  async getStoreGroupCommonByUuids(storeGroupUuids) {
    const { data } = await axios.get(
      `${config.server.store_api}/store-group/list-common-uuids`,
      {
        params: { store_group_uuids: storeGroupUuids },
      }
    );

    return data;
  },

  /**
   * @param {string} token
   * @returns
   */
  async getCustomerCommonByUuids(customerUuids) {
    const { data } = await axios.get(
      `${config.server.customer_api}/customer/list-common-uuids`,
      {
        params: { customer_uuids: customerUuids },
      }
    );
    return data;
  },

  /**
   * @param {string} token
   * @returns
   */
  async getCustomerCommonByEmails(emails) {
    const {
      data,
    } = await axios.post(
      `${config.server.customer_api}/customer/list-common-by-list`,
      { fieldName: 'email', list: emails }
    );
    return data;
  },

  slugify(string) {
    return string
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  },

  putLog(header, query, result) {
    const context = new Context();
    const user = context.currentUser;
    const obj = {
      client_uuid: user.client_uuid,
      username: user.username,
      header: header,
      request: query,
      response: result,
    };
    // console.log(JSON.stringify(obj));
  },

  generateUUID(){
    return uuidv4()
  }
};
