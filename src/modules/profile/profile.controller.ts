import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/auth.guard';
import { RolesGuard } from 'src/common/role.guard';
import { Roles } from 'src/common/roles.decorator';
import { get } from 'http';

@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @ApiOperation({summary: "ADMIN, SUPERADMIN, USER"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN", "USER")
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto)
  }

  @Get()
  @ApiOperation({summary: "ADMIN, SUPERADMIN"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN")
  findAll() {
    return this.profileService.findAll()
  }


  
  @Get(':id')
  @ApiOperation({ summary: "ADMIN, SUPERADMIN, USER"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN", "USER")
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({summary: "ADMIN, SUPERADMIN, USER"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN", "USER")
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto)
  }

  @Delete(':id')
  @ApiOperation({summary: "ADMIN, SUPERADMIN"})
  @Roles("ADMIN", "SUPERADMIN")
  remove(@Param('id') id: string) {
    return this.profileService.remove(id)
  }
}
