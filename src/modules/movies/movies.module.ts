import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, PrismaModule],
})
export class MoviesModule {}
