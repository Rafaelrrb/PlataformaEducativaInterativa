import {Controller, Get, UseGuards,Request, Query, Body, Patch} from '@nestjs/common';
import { StudentsService } from './students.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {

    return this.studentsService.findProfile(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('videoClass')
  getVideoClass(@Query('page') page: number, @Query('pageSize') pageSize: number) {
    const pageValue = page || 1; // Página padrão
    const pageSizeValue = pageSize || 5; // Tamanho da página padrão
    return this.studentsService.findVideoClass(pageValue, pageSizeValue);
  }

  @UseGuards(JwtAuthGuard)
  @Get('issue')
  getIssue(@Query('page') page: number, @Query('pageSize') pageSize: number) {
    const pageValue = page || 1; 
    const pageSizeValue = pageSize || 50; 
    return this.studentsService.findIssue(pageValue, pageSizeValue);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('virtualCoins')
  async updateVirtualCoins(@Request() req, @Body() updateStudentDto: number) {
    return this.studentsService.updateVirtualCoins(req.user.userId, updateStudentDto);
  }
}
