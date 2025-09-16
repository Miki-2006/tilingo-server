import { Expose } from "class-transformer";

export class userResponseDto{
    @Expose()
    id: string;

    @Expose()
    nickName: string;

    @Expose()
    email: string
}