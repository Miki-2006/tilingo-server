import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { modulesResponseDto } from './dto/get-modules.dto';

@Injectable()
export class ModulesService {
  constructor(
    private readonly prisma: PrismaService
  ){}

  async getOnlyModulesOfUser(userId: UUID) {
    const modulesOfUser = await this.prisma.modules.findMany({
      where: {
        user_id: userId
      },
    });
    if (modulesOfUser) {
      // const response = new modulesResponseDto();
      // response.name = modulesOfUser.name;
      // response.userId = modulesOfUser.user_id
      return modulesOfUser;
    } else {
      console.log(`User with id: ${userId} does not have modules`);
    }
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
