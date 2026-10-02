import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { title } from 'process';

@Injectable()
export class MoviesService {
  constructor(
    private readonly prisma: PrismaService
  ){}

  create(createMovieDto: CreateMovieDto) {
    return 'This action adds a new movie';
  }

  async fetchAll() {
    const movies = await this.prisma.movies.findMany();
    return {
      movies: movies.map((m) => {
        return {
          id: m.id,
          title: m.title,
          speaker: m.speaker,
          sourceUrl: m.sourceUrl,
          cover: m.cover
        };
      }),
      count: movies.length
    }
  }

  async fetchOne(id: string) {
    const movie = await this.prisma.movies.findUnique({
      where: { id }
    })
    if(!movie) return null;
    return {
      id: movie.id,
      title: movie.title,
      speaker: movie.speaker,
      cover: movie.cover,
      sourceUrl: movie.sourceUrl
    }
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
