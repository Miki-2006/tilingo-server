import { IsString } from "class-validator";

export class CreateVideoGenerationDto {
    @IsString()
    text: string;
}