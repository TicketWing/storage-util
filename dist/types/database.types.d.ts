export interface DatabaseUtil {
    get(options: GetDBOptions): Promise<any>;
    insert<T>(data: T, options: InsertDBOptions): Promise<any>;
    update<T>(data: T, options: UpdateDBOptions): Promise<void>;
    delete(options: DeleteDBOptions): Promise<void>;
}
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
