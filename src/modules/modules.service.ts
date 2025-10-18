import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { modulesResponseDto } from './dto/get-modules.dto';
import { CreateModuleDto } from './dto/create-module.dto';
import { response } from 'express';
import { ModulesNotFoundError, UserNotFoundError } from '../common/errors/modules.errors';
import { Prisma } from '@prisma/client';

@Injectable()
export class ModulesService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async getOnlyModulesOfUser(userId: UUID) {
    const modulesOfUser = await this.prisma.modules.findMany({
      where: {
        user_id: userId
      },
    });

    if (modulesOfUser.length > 0) {
      const response = new modulesResponseDto();
      response.modules = modulesOfUser;
      response.status = 200;
      return response;
    } else {
      throw new ModulesNotFoundError(userId);
    }
  }

  async createNewModuleForUser(createModuleDto: CreateModuleDto) {
    try {
      const newModule = await this.prisma.modules.create({
        data: {
          name: createModuleDto.name,
          user_id: createModuleDto.userId,
        }
      })

      if (newModule) {
        return newModule;
      }
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new UserNotFoundError(createModuleDto.userId);
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
}