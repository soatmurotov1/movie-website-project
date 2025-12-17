import { Module } from '@nestjs/common';
import { MovieCategoriesService } from './movie_categories.service';
import { MovieCategoriesController } from './movie_categories.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthGuard } from 'src/common/auth.guard';
import { RolesGuard } from 'src/common/role.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [MovieCategoriesController],
  providers: [
    MovieCategoriesService, 
    PrismaService,
    AuthGuard, 
    RolesGuard,
    JwtService
  ],
  exports: [
    AuthGuard, 
    RolesGuard

  ]
})
export class MovieCategoriesModule {}
