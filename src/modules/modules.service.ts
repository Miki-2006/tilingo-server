import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ModulesService {
  constructor(
    private readonly prisma: PrismaService
  ){}

  async getModulesOfUser(userId: UUID) {
    return this.prisma.modules.findMany({
      where: {
        user_id: userId
      },
      include: {
        words: true, // подтянуть связанные слова, если нужно
      },
    })
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} module`;
  // }

  // update(id: number, updateModuleDto: UpdateModuleDto) {
  //   return `This action updates a #${id} module`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} module`;
  // }
}
