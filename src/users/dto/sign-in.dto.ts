import { IsString, IsNotEmpty } from "class-validator";

export class CheckingPasswordOfUserDto {
    @IsString()
    @IsNotEmpty()
    readonly nickName: string;

    @IsString()
    readonly password: string;
}