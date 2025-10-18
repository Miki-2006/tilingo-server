import { UUID } from "crypto";

export class CreateModuleDto {
    name: string;
    userId: UUID;
}
