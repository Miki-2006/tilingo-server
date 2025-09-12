import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateNewUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/new-user/sign-up')
  create(@Body() createNewUserDto: CreateNewUserDto) {
    return this.usersService.signUpNewUser(createNewUserDto);
  }

  @Get('/user/find/:nickName')
  findOne(@Param('nickName') nickNameOfSearchingUser: string) {
    return this.usersService.findUserByNickName(nickNameOfSearchingUser);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
