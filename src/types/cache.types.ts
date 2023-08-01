export type CacheOptions = {
  keyField: string;
  cachedFields: string[];
};

export type GetCacheOptions = {
  cacheKey: string;
};

export type InsertCacheOptions = {
  keyField: string;
  cachedFields: string[];
};

export type UpdateCacheOptions = {
  cacheKey: string;
  updatingFields: string[];
};

export type DeleteCacheOptions = {
  cacheKey: string;
};
