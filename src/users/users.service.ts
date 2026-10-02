import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNewUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { CheckingPasswordOfUserDto } from './dto/login.dto';
import { userResponseDto } from './dto/response-user.dto';
import { PasswordNotCorrectError, UserNotFoundError, UserAlreadyExistsError } from '../common/errors/users.errors';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async findByEmail(email: string) {
    return this.prisma.users.findUnique({ where: { email } });
  }

  async create(data: { email: string; supabaseId: string, nickName: string }) {
    return this.prisma.users.create({ data });
  }
  
  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const data = await this.prisma.users.update({
        data: {nickName: updateUserDto.nickName},
        where: {id: id}
      })

      if (!data) {
        throw new Error("Could not edit nickName of user!")
      }
      return data;
    } catch (error) {
      throw new Error(`Error occured in editing nickName: ${error}`)
    }
  }

  // async signUpNewUser(createNewUserDto: CreateNewUserDto) {
  //   const existingUser = await this.prisma.users.findUnique({
  //     where: {
  //       nickName: createNewUserDto.nickName
  //     }
  //   });
  //   if (existingUser) {
  //     throw new UserAlreadyExistsError(createNewUserDto.nickName);
  //   }
  //   return this.prisma.users.create({
  //     data: {
  //       nickName: createNewUserDto.nickName,
  //       email: createNewUserDto.email,
  //       password: await bcrypt.hash(createNewUserDto.password, 10)
  //     }
  //   })
  // }

  // async signInByNickName(checkingPasswordOfUserDto: CheckingPasswordOfUserDto): Promise<any> {
  //   const user = await this.prisma.users.findUnique({
  //     where: {
  //       nickName: checkingPasswordOfUserDto.nickName,
  //     },
  //   });

  //   if (!user) {
  //     throw new UserNotFoundError(checkingPasswordOfUserDto.nickName);
  //   }

  //   // Use await with the promise-based version of bcrypt.compare
  //   const isPasswordValid = await bcrypt.compare(
  //     checkingPasswordOfUserDto.password,
  //     user.password
  //   );

  //   if (!isPasswordValid) {
  //     throw new PasswordNotCorrectError(checkingPasswordOfUserDto.nickName);
  //   }

  //   const { password, ...userWithoutPassword } = user;
  //   return userWithoutPassword;
  // }

  // async getUserByNickName(nickName: string) {
  //   const user = await this.prisma.users.findUnique({
  //     where: {
  //       nickName: nickName
  //     }
  //   });
  //   if (user) {
  //     const userResponse = new userResponseDto();
  //     userResponse.id = user.id;
  //     userResponse.nickName = user.nickName;
  //     userResponse.email = user.email;
  //     return userResponse;
  //   } else {
  //     throw new UserNotFoundError(nickName);
  //   }
  // }

  // findAll() {
  //   return `This action returns all users`;
  // }



  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
