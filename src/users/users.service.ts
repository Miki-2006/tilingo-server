import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNewUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService
  ){}
  
  async signUpNewUser(createNewUserDto: CreateNewUserDto) {
    return this.prisma.users.create({
      data: {
        nickName: createNewUserDto.nickName,
        email: createNewUserDto.email,
        password: await bcrypt.hash(createNewUserDto.password, 15)
      }
    })
  }

  async findUserByNickName(nickNameOfSearchingUser: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        nickName: nickNameOfSearchingUser,
      },
    });
    // if (user) {
    //   const isMatch = await bcrypt.compare()
    // }
    return user;
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
