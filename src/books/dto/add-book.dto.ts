
export class AddBookDto {
    title: string;
    author: string;
    pages: string;
}

export class FilesOfBookDto {
    file: Express.Multer.File[];
    cover: Express.Multer.File[];
}