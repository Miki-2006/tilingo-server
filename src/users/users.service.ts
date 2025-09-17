import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNewUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { CheckingPasswordOfUserDto } from './dto/sign-in.dto';
import { userResponseDto } from './dto/response-user.dto';
import { PasswordNotCorrectError, UserNotFoundError, DatabaseUsersError } from 'src/common/errors/users.errors';

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

  // async signInByNickName(checkingPasswordOfUserDto: CheckingPasswordOfUserDto): Promise<any> {
  //   const user = await this.prisma.users.findFirst({
  //     where: {
  //       nickName: checkingPasswordOfUserDto.nickName,
  //     },
  //   });
  //   if (!user) {
  //     throw new UserNotFoundError(checkingPasswordOfUserDto.nickName);

  //   }
  //   await bcrypt.compare(checkingPasswordOfUserDto.password, user.password, (err, result) => {
  //     if (err) {
  //       console.error('Error comparing password:', err);
  //       //send message to client
  //       return;
  //     }
  //     if (result) {
  //       console.log('Password match! User authenticated.');
  //       return result;
  //     } else {
  //       throw new PasswordNotCorrectError(checkingPasswordOfUserDto.nickName);
  //     }
  //   });
  // }

  async signInByNickName(checkingPasswordOfUserDto: CheckingPasswordOfUserDto): Promise<any> {
  try {
    const user = await this.prisma.users.findFirst({
      where: {
        nickName: checkingPasswordOfUserDto.nickName,
      },
    });
    
    if (!user) {
      throw new UserNotFoundError(checkingPasswordOfUserDto.nickName);
    }

    // Use await with the promise-based version of bcrypt.compare
    const isPasswordValid = await bcrypt.compare(
      checkingPasswordOfUserDto.password, 
      user.password
    );
    
    if (!isPasswordValid) {
      throw new PasswordNotCorrectError(checkingPasswordOfUserDto.nickName);
    }

    console.log('Password match! User authenticated.');
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
    
  } catch (error) {
    if (error instanceof DatabaseUsersError) {
      throw error;
    }
    
    console.error('Error during sign in:', error);
    throw new Error('Authentication failed due to server error');
  }
}

  async getUserByNickName(nickName: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        nickName: nickName
      }
    });
    if (user) {
      const userResponse = new userResponseDto();
      userResponse.id = user.id;
      userResponse.nickName = user.nickName;
      userResponse.email = user.email;
      return userResponse;
    } else {
      throw new UserNotFoundError(nickName);
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
