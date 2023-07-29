import { Knex } from "knex";

export type Conditions = {
  [key: string]: string;
};

export type RedisConfig = {
  port: number;
  host: string;
  username: string; // needs Redis >= 6
  password: string;
  db: number;
};

export type KnexConfig = Knex.Config<{
  development: {
    client: string;
    version: string;
    connection: {
      host: string;
      port: number;
      user: string;
      password: string;
      database: string;
    };
    migrations: {
      directory: string;
    };
  };
}>;
