import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { dataSourceOptions } from '../db/data-source';
import { UserModule } from './user/user.module';
import { HomeModule } from './home/home.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
