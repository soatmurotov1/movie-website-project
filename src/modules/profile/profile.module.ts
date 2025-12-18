import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthGuard } from 'src/common/auth.guard';
import { RolesGuard } from 'src/common/role.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || "secret",
      signOptions: { expiresIn: "1d" }
    })
  ],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    AuthGuard,
    RolesGuard
  ],
  exports: [
    AuthGuard,
    RolesGuard
  ]
})
export class ProfileModule {}
