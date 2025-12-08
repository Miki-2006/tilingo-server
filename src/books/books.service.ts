import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseBookDto } from './dto/response-book.dto';

@Injectable()
export class BooksService {
  constructor(
    private readonly prisma: PrismaService  ) { }

  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }

  async getAll(): Promise<{ books: ResponseBookDto[], count: number }> {
    const books = await this.prisma.books.findMany();
    return {
      books: books.map((book) => {
        return {
          id: book.id,
          title: book.title,
          author: book.author,
          pages: Number(book.pages),
          fileUrl: book.fileUrl,
          createdAt: book.createdAt,
          imageUrl: book.imageUrl
        };
      }),
      count: books.length
    }
  }

  async getOneById(id: string): Promise<ResponseBookDto | null> {
    const book = await this.prisma.books.findUnique({
      where: { id }
    });
    if (!book) return null;
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      pages: Number(book.pages),
      fileUrl: book.fileUrl,
      createdAt: book.createdAt,
      imageUrl: book.imageUrl
    };
  }

  // async getSignedUrl(path: string): Promise<string> {
  //   const { data, error } = await this
  //   supabase.storage
  //     .from('books')
  //     .createSignedUrl(path, 3600);

  //   if (error || !data?.signedUrl) {
  //     throw new Error('Failed to generate signed URL');
  //   }

  //   return data.signedUrl;
  // }


  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
