const flatCache = require('flat-cache');
const path = require('path');
import axios from 'axios';
import config from '../config';
import { AppError } from '../core/errors';

const env = process.env.NODE_ENV || 'development';

export class Cache {
  async getMaster(key, functionGetData, client_uuid = null) {
    try {
      let field = key;
      let pathCache = `./server/cache/${env}`;

      if (client_uuid) {
        field = client_uuid;
        pathCache = `./server/cache/${env}/${key}-client`;
      }

      let data = flatCache.load(field, path.resolve(pathCache));

      let result = data.getKey('data');

      if (result) {
        return result;
      }

      // get data and save in file
      result = await functionGetData();
      console.log(result.data.length);
      data.setKey('data', result.data);
      data.save();

      return result.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async deleteCache(key) {
    flatCache.clearCacheById(key, path.resolve(`./server/cache/${env}`));
    flatCache.clearAll(path.resolve(`./server/cache/${env}/${key}-client`));
  }

  async saveMaster(key, functionGetData, client_uuid = null) {
    try {
      if (client_uuid) {
        key = key + '_' + client_uuid;
      }

      let data = flatCache.load(key, path.resolve(`./server/cache/${env}`));
      const result = await functionGetData();
      data.setKey('data', result.data);
      data.save();

      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async updateCacheAnotherService(key, listService) {
    try {
      const promises = [];
      listService.forEach(service =>
        promises.push(axios.put(`${config.server[service]}/cache/${key}`))
      );
      return Promise.all(promises);
    } catch (error) {
      throw new AppError('Update cache error', 500);
    }
  }
}
