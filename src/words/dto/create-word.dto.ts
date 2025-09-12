import { IsString } from "class-validator";
import { UUID } from "crypto";

export class CreateWordDto {
    @IsString()
    readonly word: string;

    readonly definition: string;

    readonly module_id: UUID;

    readonly image: string;
}
