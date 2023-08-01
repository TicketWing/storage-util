import { Knex } from "knex";

export type RedisConfig = {
  port: number;
  host: string;
  username: string;
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
