export const OrmConfiguration = {
  production: {
    type: 'postgres',
    synchronize: true,
    dropSchema: false,
    logging: true,
    entities: [`${process.cwd()}/dist/TypeOrm/Entities/**/*.entity.js`],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    }
  },
  testing: {
    type: 'postgres',
    synchronize: true,
    dropSchema: false,
    logging: false,
    entities: [`${process.cwd()}/dist/TypeOrm/Entities/**/*.entity.js`],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    }
  },
  development: {
    type: 'mysql',
    synchronize: true,
    dropSchema: false,
    logging: true,
    entities: [`${process.cwd()}/dist/TypeOrm/Entities/**/*.entity.js`],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    }
  },
};
