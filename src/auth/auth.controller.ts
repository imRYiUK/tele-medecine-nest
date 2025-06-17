import { Controller, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiTags } from '@nestjs/swagger';
import { LogActivity } from '../common/decorators/log-activity.decorator';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @LogActivity({
    typeAction: 'CONNEXION',
    description: (result) => `Connexion de l'utilisateur: ${result.user.email}`,
  })
  async login(@Body() loginDto: LoginDto) {
    // const user = await this.authService.validateUser(loginDto.email, loginDto.password);

    // if (!user) {
    //   throw new HttpException('Invalid email or password', HttpStatus.BAD_REQUEST);
    // }
    return this.authService.login(loginDto);
  }

  @Post('register')
  @LogActivity({
    typeAction: 'INSCRIPTION',
    description: (result) => `Inscription d'un nouvel utilisateur: ${result.user.email}`,
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // @Post('register')
  // @ApiOperation({ summary: 'Register a new user' })
  // @ApiResponse({ status: 201, description: 'User successfully registered' })
  // @ApiResponse({ status: 400, description: 'Bad request' })
  // @ApiResponse({ status: 409, description: 'Username or email already exists' })
  // @HttpCode(HttpStatus.CREATED)
  // async register(@Body() registerDto: RegisterDto) {
  //   return this.authService.register(registerDto);
  // }
}