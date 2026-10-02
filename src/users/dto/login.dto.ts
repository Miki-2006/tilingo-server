import { PickType } from "@nestjs/mapped-types";
import { IsString, IsNotEmpty } from "class-validator";
import { CreateNewUserDto } from "./create-user.dto";

export class CheckingPasswordOfUserDto extends PickType(CreateNewUserDto, ['nickName', 'password']) {}