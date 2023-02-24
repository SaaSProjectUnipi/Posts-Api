import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
  UsePipes,
  Get,
  Req,
  UseGuards, ValidationPipe, Param, Query,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/user.create.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/user-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { getAccessTokenDecorator } from '../decorators/getAccessToken.decorator';
import {UserDto} from "../users/dto/user.dto";
import {UsersService} from "../users/users.service";

@UsePipes(new ValidationPipe({transform: true}))
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly userService: UsersService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ) {
    console.log(createUserDto)
    const user = await this.authService.register(createUserDto);

    if (!user) {
      throw new HttpException("User cant be created", HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Post('logout')
  public async logout(@getAccessTokenDecorator() token: any) {
    return await this.authService.logout(token);
  }

  @Get('user')
  @UseGuards(AuthGuard())
  public async getUserSelf(@Req() req: any) {
    console.log(req.user)
    return req.user;
  }

  @Get('/contacts/add')
  @UseGuards(AuthGuard())
  public async addToContacts(@Req() req: any,
                             @Query('contact') email: string,) {
    let user = req.user as UserDto

    return this.userService.addToContacts(user.id,email);
  }

}
