import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthGuard } from 'src/common/auth.guard';
import { RolesGuard } from 'src/common/role.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [
    ProfileController
  ],
  providers: [
    ProfileService, 
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
export class ProfileModule {}
