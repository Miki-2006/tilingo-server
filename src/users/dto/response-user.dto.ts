import { Exclude, Expose } from "class-transformer";
import { UUID } from "crypto";

export class userResponseDto{
    @Expose()
    id: UUID;

    @Expose()
    nickName: string;

    @Expose()
    email: string

    @Exclude()
    password: string
}