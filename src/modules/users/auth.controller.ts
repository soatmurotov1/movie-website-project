import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { VerifyDto } from './dto/verify.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/auth.guard';
import { RolesGuard } from 'src/common/role.guard';
import { Roles } from 'src/common/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('verify')
  verify(@Body() dto: VerifyDto) {
    return this.authService.verify(dto.email, dto.otp)
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.username, dto.password)
  }

  @ApiBearerAuth()
  @Get('users')
  @ApiOperation({ summary: "SUPERADMIN, ADMIN" })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN")
  getAllUsers() {
    return this.authService.findAllUsers()
  }

  @ApiBearerAuth()
  @Get('users/:id')
  @ApiOperation({ summary: "ADMIN, SUPERADMIN, USER" })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN", "USER")
  getUser(@Param('id') id: string) {
    return this.authService.findOneUser(id)
  }

  @ApiBearerAuth()
  @Patch('users/:id')
  @ApiOperation({ summary: "SUPERADMIN, ADMIN, USER" })
 @UseGuards(AuthGuard, RolesGuard)
 @Roles("SUPERADMIN", "ADMIN", "USER") 
  updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.authService.updateUser(id, dto)
  }

  @ApiBearerAuth()
  @Delete('users/:id')
  @ApiOperation({ summary: "SUPERADMIN" })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("SUPERADMIN")
  deleteUser(@Param('id') id: string) {
    return this.authService.removeUser(id)
  }
}
