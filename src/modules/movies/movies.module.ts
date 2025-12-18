import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthGuard } from 'src/common/auth.guard';
import { RolesGuard } from 'src/common/role.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [MoviesController],
  providers: [
    MoviesService, 
    PrismaModule,
    AuthGuard,
    RolesGuard,
    JwtService
  ],
  exports: [
    AuthGuard, 
    RolesGuard,
    JwtService
  ]
})
export class MoviesModule {}
