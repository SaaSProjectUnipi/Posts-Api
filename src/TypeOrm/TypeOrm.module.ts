import { Module } from '@nestjs/common';
import { TypeOrmProviders } from './TypeOrm.service.js';

@Module({
    providers: [...TypeOrmProviders],
    exports: [...TypeOrmProviders],
})
export class TypeOrmModule {}
