import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthGuard } from 'src/common/auth.guard';
import { RolesGuard } from 'src/common/role.guard';
import { JwtModule } from '@nestjs/jwt';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || "secret",
      signOptions: { expiresIn: "1d" },
    })
  ],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    AuthGuard,
    RolesGuard
  ],
  exports: [
    AuthGuard,
    RolesGuard
  ]
})
export class FavoritesModule {}
