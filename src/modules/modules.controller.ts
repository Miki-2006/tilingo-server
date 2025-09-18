import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { UUID } from 'crypto';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) { }

  @Get('/:userId')
  fetchOnlyModulesByUserId(
    @Param('userId') user_id: UUID
  ) {
    return this.modulesService.getOnlyModulesOfUser(user_id);
  }

  // @Post()
  // create(@Body() createModuleDto: CreateModuleDto) {
  //   return this.modulesService.create(createModuleDto);
  // }

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
