import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNewUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { CheckingPasswordOfUserDto } from './dto/sign-in.dto';
import { userResponseDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async signUpNewUser(createNewUserDto: CreateNewUserDto) {
    return this.prisma.users.create({
      data: {
        nickName: createNewUserDto.nickName,
        email: createNewUserDto.email,
        password: await bcrypt.hash(createNewUserDto.password, 10)
      }
    })
  }

  async signInByNickName(checkingPasswordOfUserDto: CheckingPasswordOfUserDto) {
    const user = await this.prisma.users.findFirst({
      where: {
        nickName: checkingPasswordOfUserDto.nickName,
      },
    });
    if (user) {
      await bcrypt.compare(checkingPasswordOfUserDto.password, user.password, (err, result) => {
        if (err) {
          console.error('Error comparing password:', err);
          //send message to client
          return;
        }
        if (result) {
          console.log('Password match! User authenticated.');
        } else {
          console.log('Password do not match!', result);
        }
      });
    } else {
      throw new Error("Can not find user!");
    }
  }

  async getUserByNickName (nickName: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        nickName: nickName
      }
    });
    if (user) {
      console.log('User was found:', nickName);
      const userResponse = new userResponseDto();
      userResponse.id = user.id;
      userResponse.nickName = user.nickName;
      userResponse.email = user.email;
      return userResponse;
    } else {
      console.log('Can not find user with nickName:', nickName);
    }
  }

  // findAll() {
  //   return `This action returns all users`;
  // }


  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
