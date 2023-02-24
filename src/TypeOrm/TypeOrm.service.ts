import { AppDataSource } from './data-source';

export const TypeOrmProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => await AppDataSource.initialize(),
    },
];