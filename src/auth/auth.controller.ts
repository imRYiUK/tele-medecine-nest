import { Controller, Post, Body, UseGuards, Req, Get, Query, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    return this.authService.login(user);
  }

  // OAuth2 standard endpoints
  @Get('authorize')
  authorize(
    @Query('client_id') clientId: string,
    @Query('redirect_uri') redirectUri: string,
    @Query('response_type') responseType: string,
    @Query('scope') scope: string,
    @Query('state') state: string,
  ) {
    // In a real implementation, this would validate the client and redirect to login page
    // For this demo, we'll return a simple authorization code
    if (!clientId || !redirectUri || responseType !== 'code') {
      throw new UnauthorizedException('Invalid OAuth2 parameters');
    }

    return {
      code: 'demo_auth_code',
      state,
    };
  }

  @Post('token')
  @HttpCode(HttpStatus.OK)
  async token(
    @Body('grant_type') grantType: string,
    @Body('code') code: string,
    @Body('client_id') clientId: string,
    @Body('client_secret') clientSecret: string,
    @Body('redirect_uri') redirectUri: string,
  ) {
    // In a real implementation, this would validate the authorization code and client credentials
    if (grantType !== 'authorization_code' || !code || !clientId || !clientSecret) {
      throw new UnauthorizedException('Invalid token request');
    }

    // Create a demo user for token generation
    const demoUser = {
      id: 999,
      email: 'demo@example.com',
      roles: ['user'],
    };

    return this.authService.login(demoUser as any);
  }

  @Post('introspect')
  @HttpCode(HttpStatus.OK)
  async introspect(@Body('token') token: string) {
    if (!token) {
      return { active: false };
    }
    return this.authService.validateToken(token);
  }

  @Post('revoke')
  @HttpCode(HttpStatus.OK)
  async revoke(@Body('token') token: string) {
    if (!token) {
      throw new UnauthorizedException('Token is required');
    }
    return this.authService.revokeToken(token);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req: Request) {
    return req.user;
  }
}