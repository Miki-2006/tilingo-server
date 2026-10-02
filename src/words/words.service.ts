import { Injectable } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WordsService {
  constructor(
    private readonly prisma: PrismaService
  ) {
  }

  async create(createWordDto: CreateWordDto) {
    try {
      const word = await this.prisma.words.create({
        data: {
          word: createWordDto.word,
          definition: createWordDto.definition,
          moduleId: createWordDto.module_id,
          image: createWordDto.image
        }
      })
      if (!word) {
        throw new Error("Could not create new word!")
      }
      return word
    } catch (error) {
      throw new Error(`Error occured in creating new word: ${error}`)
    }
  }

  async findAll(moduleId: string) {
    try {
      const words = await this.prisma.words.findMany({
        where: {moduleId: moduleId}
      })
      if (!words) {
        throw new Error("Could not get words!")
      }
      return words
    } catch (error) {
      throw new Error(`Error occured in getting words: ${error}`)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} word`;
  }

  update(id: number, updateWordDto: UpdateWordDto) {
    return `This action updates a #${id} word`;
  }

  remove(id: number) {
    return `This action removes a #${id} word`;
  }
}
