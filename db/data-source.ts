import { DataSource, DataSourceOptions } from 'typeorm';

// For conecting to DB
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'users',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false, // should be false - synchronise via TypeORM Migrations instead
};

// For migration
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
