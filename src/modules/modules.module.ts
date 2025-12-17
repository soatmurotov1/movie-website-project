import { Module } from '@nestjs/common';
import { AuthModule } from './users/auth.module';
import { ProfileModule } from './profile/profile.module';
import { MoviesModule } from './movies/movies.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [AuthModule, ProfileModule, MoviesModule, CategoriesModule],
  exports: [AuthModule]
})
export class ModulesModule {}
