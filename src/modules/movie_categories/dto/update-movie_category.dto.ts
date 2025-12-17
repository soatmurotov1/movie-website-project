import { PartialType } from '@nestjs/swagger';
import { CreateMovieCategoryDto } from './create-movie_category.dto';

export class UpdateMovieCategoryDto extends PartialType(CreateMovieCategoryDto) {}
