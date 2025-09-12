import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateNewUserDto {
    @IsString()
    @IsNotEmpty()
    readonly nickName: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
  
    @IsString()
    @MinLength(6)
    readonly password: string;
}
