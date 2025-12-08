import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { UUID } from 'crypto';
import { CreateModuleDto } from './dto/create-module.dto';
import { ModulesApiExceptionFilter } from '../common/filters/modules-exception.filter';

@Controller('modules')
@UseFilters(ModulesApiExceptionFilter)
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) { }

  @Get('/:userId')
  fetchOnlyModulesByUserId(
    @Param('userId') userId: UUID
  ) {
    return this.modulesService.getOnlyModulesOfUser(userId);
  }

  @Post('/new')
  createNewModule(@Body() createModuleDto: CreateModuleDto) {
    return this.modulesService.createNewModuleForUser(createModuleDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.modulesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto) {
  //   return this.modulesService.update(+id, updateModuleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.modulesService.remove(+id);
  // }
}
