import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { moduleDTO } from "./module.dto";

export class modulesResponseDto {
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => moduleDTO)
    modules: moduleDTO[];

    status: number;
}