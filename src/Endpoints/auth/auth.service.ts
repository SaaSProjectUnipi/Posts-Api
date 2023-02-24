import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/user.create.dto';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from '../users/dto/user-login.dto';
import { UserDto } from '../users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  public static invalidTokens: string[] = []
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto) {
    return await this.usersService.create(userDto);

  }

  async logout(token: string){
    let payload = this.jwtService.decode(token.split("Bearer ")[1].trim())
    //@ts-ignore
    AuthService.invalidTokens.push(payload["id"])

  }


  async login(loginUserDto: LoginUserDto){
    // find user in db
    const user = await this.usersService.findByLogin(loginUserDto);

    // generate and sign token
    const token = this.getTokens(user);

    return {
      username: user.username,
      ...token,
    };
  }

  async validateUser(payload: any): Promise<UserDto> {
    const user = await this.usersService.findOne({
      where: {
        id: payload.user_id
      },
      select: {
        id: true,
        username: true,
        firstname: true,
        lastname: true,
        email: true,
        password: true
      }
    })
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private getTokens(user: UserDto): any {
    const expiresIn = process.env.EXPIRESIN;

    const accessToken = this.jwtService.sign({
      user_id: user.id,
      type: "access_token",
      id: randomUUID()
    },{
      subject: JSON.stringify(user.id)
    });
    return {
      expiresIn,
      accessToken,
    };
  }
}
