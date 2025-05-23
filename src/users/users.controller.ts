import { Controller, Get, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Req() req: Request) {
    if (!req.user) {
      throw new UnauthorizedException('User not found');
    }
    
    const user = await this.usersService.findById(req.user['id']);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return {
      id: user.id,
      email: user.email,
      roles: user.roles,
      lastLogin: user.lastLogin,
    };
  }
}
