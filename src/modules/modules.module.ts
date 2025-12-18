import { Module } from '@nestjs/common';
import { AuthModule } from './users/auth.module';
import { ProfileModule } from './profile/profile.module';
import { MoviesModule } from './movies/movies.module';
import { CategoriesModule } from './categories/categories.module';
import { MovieCategoriesModule } from './movie_categories/movie_categories.module';
import { MovieFilesModule } from './movie_files/movie_files.module';

@Module({
  imports: [
    AuthModule, 
    ProfileModule, 
    MoviesModule, 
    CategoriesModule, 
    MovieCategoriesModule, 
    MovieFilesModule
  ],
  exports: [AuthModule]
})
export class ModulesModule {}
