import { IsString } from "class-validator";

export class moduleDTO {
    @IsString()
    name: string;

    @IsString()
    user_id: string;

    @IsString()
    id: string
}