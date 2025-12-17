import { Module } from '@nestjs/common';
import { MovieCategoriesService } from './movie_categories.service';
import { MovieCategoriesController } from './movie_categories.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MovieCategoriesController],
  providers: [MovieCategoriesService, PrismaService],
})
export class MovieCategoriesModule {}
