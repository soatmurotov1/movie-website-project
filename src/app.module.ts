import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/users/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { MoviesModule } from './modules/movies/movies.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ProfileModule,
    MoviesModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ]
})
export class AppModule {}
