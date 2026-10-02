import { IsString } from "class-validator";

export class moduleDTO {
    @IsString()
    name: string;

    @IsString()
    userId: string;

    @IsString()
    id: string
}