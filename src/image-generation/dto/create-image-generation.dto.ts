import { IsString } from "class-validator";

export class CreateImageGenerationDto {
    @IsString()
    text: string;
}
