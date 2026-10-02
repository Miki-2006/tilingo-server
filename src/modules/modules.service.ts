import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { modulesResponseDto } from './dto/get-modules.dto';
import { CreateModuleDto } from './dto/create-module.dto';
import { response } from 'express';
import { ModulesNotFoundError, UserNotFoundError } from '../common/errors/modules.errors';
import { Prisma } from '@prisma/client';
import { UpdateModuleDto } from './dto/update-module.dto';

@Injectable()
export class ModulesService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async getOnlyModulesOfUser(userId: UUID) {
    const modulesOfUser = await this.prisma.modules.findMany({
      where: {
        userId: userId
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
          userId: createModuleDto.userId,
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

  }

  async update(id: string, updateModuleDto: UpdateModuleDto) {
    try {
      const data = await this.prisma.modules.update({
        data: {name: updateModuleDto.name},
        where: {id: id}
      })

      if (!data) {
        throw new Error("Could not edit name of module!")
      }
      return data;
    } catch (error) {
      throw new Error(`Error occured in editing module: ${error}`)
    }
  }

  async remove(id: string) {
    try {
      const data = await this.prisma.modules.delete({
        where: {id: id}
      })
      
      if (!data) {
        throw new Error("Could not delete module!")
      }
      return data;
    } catch (error) {
      throw new Error(`Error occured in deleting module: ${error}`)
    }
  }
}