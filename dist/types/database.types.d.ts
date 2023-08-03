export type WhereClause = {
    [key: string]: string;
};
export type Selectoption = string[];
export type ReturningMethod = string[];
export type GetDBOptions = {
    where: WhereClause;
    select: Selectoption;
};
export type InsertDBOptions = {
    returning: ReturningMethod;
};
export type UpdateDBOptions = {
    where: WhereClause;
};
export type DeleteDBOptions = {
    where: WhereClause;
};
