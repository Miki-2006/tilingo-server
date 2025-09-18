import { IsString } from "class-validator";

export class modulesResponseDto {
    @IsString()
    name: string;

    @IsString()
    userId: string;
}