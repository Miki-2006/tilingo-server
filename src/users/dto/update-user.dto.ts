import { PartialType } from '@nestjs/mapped-types';
import { CreateNewUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateNewUserDto) {}
