import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 });

export const getCachedData = (key: string) => {
  return cache.get(key);
};

export const setCachedData = (key: string, value: any) => {
  return cache.set(key, value);
};
