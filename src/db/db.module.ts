import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBService } from './db.service';
import { entities } from './typeorm.config';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [DBService],
  exports: [TypeOrmModule, DBService],
})
export class DBModule {}
