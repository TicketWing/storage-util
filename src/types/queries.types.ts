export type WhereClause = {
  [key: string]: string;
};

export type SelectQuery = string[];

export type ReturningMethod = string[];

export type GetQueries = {
  where: WhereClause;
  select: SelectQuery;
};

export type InsertQueries = {
  returning: ReturningMethod;
};

export type UpdateQueries = {
  where: WhereClause;
};

export type DeleteQueries = {
  where: WhereClause;
};
