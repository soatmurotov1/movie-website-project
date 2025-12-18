import { Module } from '@nestjs/common';
import { MovieFilesService } from './movie_files.service';
import { MovieFilesController } from './movie_files.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthGuard } from 'src/common/auth.guard';
import { RolesGuard } from 'src/common/role.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({ 
      secret: process.env.JWT_SECRET || "secret",
      signOptions: { expiresIn: "1d"}
    })
  ],
  controllers: [
    MovieFilesController
  ],
  providers: [
    MovieFilesService,
    AuthGuard,
    RolesGuard
  ],
  exports: [
    AuthGuard,
    RolesGuard
  ]
})
export class MovieFilesModule {}
