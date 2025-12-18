import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/common/auth.guard';
import { RolesGuard } from 'src/common/role.guard';

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService, 
    PrismaModule, 
    AuthGuard, 
    RolesGuard, 
    JwtService
  ],
  exports: [
    AuthGuard, 
    RolesGuard
  ]
})
export class CategoriesModule {}
