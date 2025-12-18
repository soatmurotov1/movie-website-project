import { Module } from '@nestjs/common';
import { AuthModule } from './users/auth.module';
import { ProfileModule } from './profile/profile.module';
import { MoviesModule } from './movies/movies.module';
import { CategoriesModule } from './categories/categories.module';
import { MovieCategoriesModule } from './movie_categories/movie_categories.module';
import { MovieFilesModule } from './movie_files/movie_files.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    AuthModule, 
    ProfileModule, 
    MoviesModule, 
    CategoriesModule, 
    MovieCategoriesModule, 
    MovieFilesModule, FavoritesModule
  ],
  exports: [AuthModule]
})
export class ModulesModule {}
