import { Inject, Injectable } from '@nestjs/common';
import { AddBookDto, FilesOfBookDto } from './dto/add-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseBookDto } from './dto/response-book.dto';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class BooksService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
    private readonly prisma: PrismaService
  ) { }

  async create(addBookDto: AddBookDto, filesOfBookDto: FilesOfBookDto) {
    const folderName = `${addBookDto.author}_${addBookDto.title}`
      .replace(/\s+/g, '') // remove spaces
      .replace(/[^a-zA-Z0-9_-]/g, '');

    
    if (!filesOfBookDto.file) {
      throw new Error("File did not getted!")
    }

    try {
      //Uploading epub file of book
      const epubFile = filesOfBookDto.file[0]
      const epubPath = `book-files/${folderName}-${Date.now()}.epub`
      const file = await this.supabase.storage.from('books').upload(epubPath, epubFile.buffer, {
        contentType: 'application/epub+zip',
      })
      const fileRes = await this.supabase.storage.from('books').createSignedUrl(epubPath, 3600);


      //Uploading jpg cover file of book
      const coverFile = filesOfBookDto.cover[0]
      const coverPath = `book-covers/${folderName}-${Date.now()}.jpg`
      const cover = await this.supabase.storage.from('books').upload(coverPath, coverFile.buffer, {
        contentType: 'image/jpeg',
      })
      const coverRes = await this.supabase.storage.from('books').createSignedUrl(coverPath, 3600);


      //Checking of uploaded files
      if (file.error && cover.error) {
        throw new Error(`Files of new book weren't uploaded!: ${file.error}, ${cover.error}`)
      }
      if (fileRes.error && coverRes.error) {
        throw new Error(`Files of new book were not fetched!: ${fileRes.error}, ${coverRes.error}`)
      }

      const book = await this.prisma.books.create({
        data: {
          title: addBookDto.title,
          author: addBookDto.author,
          pages: BigInt(addBookDto.pages),
          fileUrl: fileRes.data?.signedUrl!,
          imageUrl: coverRes.data?.signedUrl!,
        },
      })


      // Insert into DB
      if (book) {
        const res = new ResponseBookDto()
        res.title = book.title
        res.author = book.author
        res.pages = String(book.pages)
        res.imageUrl = book.imageUrl
        res.fileUrl = book.fileUrl
        return res
      } else {
        console.log("New book was not added!");
      }
    } catch (error) {
      if (error.code === 'P2002') {
        throw new Error('Book title already exists!');
      }
      throw new Error(`Occured error in inserting and uploading new book: ${error}`)
    }
  }

  async getAll(): Promise<{ books: ResponseBookDto[], count: number }> {
    const books = await this.prisma.books.findMany();
    return {
      books: books.map((book) => {
        return {
          id: book.id,
          title: book.title,
          author: book.author,
          pages: String(book.pages),
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
      pages: String(book.pages),
      fileUrl: book.fileUrl,
      createdAt: book.createdAt,
      imageUrl: book.imageUrl
    };
  }
}
