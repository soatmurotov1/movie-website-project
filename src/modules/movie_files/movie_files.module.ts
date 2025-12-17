import { Module } from '@nestjs/common';
import { MovieFilesService } from './movie_files.service';
import { MovieFilesController } from './movie_files.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MovieFilesController],
  providers: [
    MovieFilesService, 
    PrismaService
  ],
})
export class MovieFilesModule {}
