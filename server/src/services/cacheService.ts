import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 });

export const getCachedData = (key: string) => {
  return cache.get(key);
};

export const setCachedData = (key: string, value: any, ttl: number = 0) => {
  return cache.set(key, value, ttl);
};
