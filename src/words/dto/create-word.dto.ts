import { IsString } from "class-validator";

export class CreateWordDto {
    @IsString()
    readonly word: string;

    readonly definition: string;

    readonly module_id: string;

    readonly image: string;
}
