import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/users/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { MoviesModule } from './modules/movies/movies.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { MovieCategoriesModule } from './modules/movie_categories/movie_categories.module';
import { MovieFilesModule } from './modules/movie_files/movie_files.module';
import { FavoritesModule } from './modules/favorites/favorites.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ProfileModule,
    MoviesModule,
    CategoriesModule,
    MovieCategoriesModule,
    MovieFilesModule,
    FavoritesModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ]
})
export class AppModule {}
