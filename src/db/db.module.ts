import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBService } from './db.service';
import { CopyPosition } from 'src/copy/copyPosition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CopyPosition])],
  providers: [DBService],
  exports: [TypeOrmModule, DBService],
})
export class DBModule {}
