import { Module } from '@nestjs/common';
import { MovieCategoriesService } from './movie_categories.service';
import { MovieCategoriesController } from './movie_categories.controller';
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
    MovieCategoriesController
  ],
  providers: [
    MovieCategoriesService,
    AuthGuard,
    RolesGuard
  ],
  exports: [
    AuthGuard,
    RolesGuard
  ]
})
export class MovieCategoriesModule {}
