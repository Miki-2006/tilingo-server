import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { BooksService } from './books.service';
import { AddBookDto, FilesOfBookDto } from './dto/add-book.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('/new')
  @UseInterceptors(
    FileFieldsInterceptor([
      {name: 'file', maxCount: 1},
      {name: 'cover', maxCount: 1}
    ])
  )
  async addNewBook(@Body() addBookDto: AddBookDto, @UploadedFiles() filesOfBookDto: FilesOfBookDto) {
    return this.booksService.create(addBookDto, filesOfBookDto);
  }

  @Get('/all')
  async fetchAll() {
    return this.booksService.getAll();
  }

  @Get('/:id')
  fetchOne(@Param('id') id: string) {
    return this.booksService.getOneById(id);
  }

}
