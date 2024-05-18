import { Cache } from "./cache-core.js";

const cacheHistories = new Cache()
export default class CacheUtil {
  static getCache(key) {
    return cacheHistories.get(key)
  }
  static setCache(key, value) {
    cacheHistories.set(key, value)
  }
  static removeCache(key) {
    cacheHistories.remove(key)
  }
  static clearCache() {
    cacheHistories.clear()
  }
  static toList(){
    return cacheHistories.toList()
  }
}