export declare type WhereClause = {
    [key: string]: string;
};
export declare type Selectoption = string[];
export declare type ReturningMethod = string[];
export declare type GetDBOptions = {
    where: WhereClause;
    select: Selectoption;
};
export declare type InsertDBOptions = {
    returning: ReturningMethod;
};
export declare type UpdateDBOptions = {
    where: WhereClause;
};
export declare type DeleteDBOptions = {
    where: WhereClause;
};
