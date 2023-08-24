import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { DataService } from './data.service';

//guests로 path 수정
@Controller('data')
export class DataController {
  constructor(
    private readonly dataService: DataService
  ) { }
  //db리셋
  @Post()
  async resetData() {
    await this.dataService.resetData();
  }
  //db정보 응답
  @Get()
  async getData() {
    return await this.dataService.getData();
  }
  //항목 수정
  @Patch()
  async patchData(@Body() body: any) {
    return await this.dataService.patchData(body);
  }
  //항목 삭제
  @Delete()
  async deleteData(@Query('_id') _id: string) {
    return await this.dataService.deleteData(_id);
  }
}
