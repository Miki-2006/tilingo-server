import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateNewUserDto } from './dto/create-user.dto';
import { CheckingPasswordOfUserDto } from './dto/login.dto';
import { DatabaseUsersExceptionFilter } from 'src/common/filters/users-exception.filter';

@Controller('auth')
@UseFilters(DatabaseUsersExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/new-user/sign-up')
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  create(@Body() createNewUserDto: CreateNewUserDto) {
    return this.usersService.signUpNewUser(createNewUserDto);
  }

  @Post('/user/sign-in')
  @HttpCode(HttpStatus.OK)
  findOne(@Body() checkingPasswordOfUserDto: CheckingPasswordOfUserDto) {
    return this.usersService.signInByNickName(checkingPasswordOfUserDto);
  }

  @Get('/user/:nickName')
  findUserByNickName(@Param('nickName') nickName: string) {    
    return this.usersService.getUserByNickName(nickName);
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
