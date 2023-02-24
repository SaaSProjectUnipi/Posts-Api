import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions.js';
import { Module } from '@nestjs/common';
import { OrmConfiguration } from '../Configs/orm.config.js';



@Module({})
export class OrmconfigModule {
  declare envConfig: DataSourceOptions;

  constructor() {
    const environment = process.env.NODE_ENV || 'production';
    const config: any = OrmConfiguration;

    if (!config[environment])
      throw Error(
        `The application couldn't load a configuration for the ${environment} environment. Please check your ormconfiguration.json.`,
      );

    this.envConfig = {
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USER,
      password: process.env.TYPEORM_PASSWORD,
      ssl: false,
      ...config[environment],
    };
  }

    public get(dbName: string): any {
        return {
            database: dbName,
            ...this.envConfig
        }
    }
}
