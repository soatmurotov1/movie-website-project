import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisModule } from 'src/common/redis/redis.module';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from 'src/common/mailer/mailer.module';
import { NesMailerService } from 'src/common/mailer/mailer.service';
import { AuthGuard } from 'src/common/auth.guard';
import { RolesGuard } from 'src/common/role.guard';

@Module({
  imports: [
    RedisModule,
    MailerModule,
    JwtModule.register({ 
      secret: process.env.JWT_SECRET || "secret",
      signOptions: { expiresIn: "1d" },
    })
  ],
  providers: [
    AuthService, 
    PrismaService, 
    NesMailerService,
    AuthGuard,
    RolesGuard,
  ],
  controllers: [AuthController],
  exports: [
    AuthGuard, 
    RolesGuard
  ]
})
export class AuthModule {}
