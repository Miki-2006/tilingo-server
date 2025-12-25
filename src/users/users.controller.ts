import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, HttpCode, HttpStatus, UsePipes, ValidationPipe, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateNewUserDto } from './dto/create-user.dto';
import { CheckingPasswordOfUserDto } from './dto/login.dto';
import { DatabaseUsersExceptionFilter } from '../common/filters/users-exception.filter';
import { SupabaseAuthGuard } from 'src/common/guards/auth';

@Controller('auth')
@UseFilters(DatabaseUsersExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(SupabaseAuthGuard)
  @Post('/verify')
  async verifyToken(@Req() req) {
    const { email, sub } = req.user;

    let user = await this.usersService.findByEmail(email);
    if (!user) {
      user = await this.usersService.create({
        email,
        supabaseId: sub,
        nickName: 'miki'
      });
    }

    return { user };
  }

  // @Post('/new-user/sign-up')
  // @HttpCode(201)
  // @UsePipes(new ValidationPipe())
  // create(@Body() createNewUserDto: CreateNewUserDto) {
  //   return this.usersService.signUpNewUser(createNewUserDto);
  // }

  // @Post('/user/sign-in')
  // @HttpCode(HttpStatus.OK)
  // findOne(@Body() checkingPasswordOfUserDto: CheckingPasswordOfUserDto) {
  //   return this.usersService.signInByNickName(checkingPasswordOfUserDto);
  // }

  // @Get('/user/:nickName')
  // findUserByNickName(@Param('nickName') nickName: string) {
  //   return this.usersService.getUserByNickName(nickName);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
