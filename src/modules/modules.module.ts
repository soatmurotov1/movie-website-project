import { Module } from '@nestjs/common';
import { AuthModule } from './users/auth.module';
import { ProfileModule } from './profile/profile.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [AuthModule, ProfileModule, MoviesModule],
  exports: [AuthModule]
})
export class ModulesModule {}
