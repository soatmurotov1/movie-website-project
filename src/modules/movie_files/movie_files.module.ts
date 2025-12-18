import { Module } from '@nestjs/common';
import { MovieFilesService } from './movie_files.service';
import { MovieFilesController } from './movie_files.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthGuard } from 'src/common/auth.guard';
import { RolesGuard } from 'src/common/role.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [MovieFilesController],
  providers: [
    MovieFilesService, 
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
export class MovieFilesModule {}
