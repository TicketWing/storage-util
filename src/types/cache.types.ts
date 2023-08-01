export type GetCacheOptions = {
  cacheKey: string;
  cachedFields: string[];
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
