import { Controller, Get, UseGuards, Request, Post, Body } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateVideoClassDto } from 'src/video-classes/dto/creat-videoClass.dto';
import { CreateIssueDto } from 'src/issues/dto/creat-issue.dto';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.teachersService.findProfile(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('videoClass')
  async createVideoClass(@Request() req, @Body() createVideoClassDto: CreateVideoClassDto) {
    const teacherId = req.user.userId;
    return this.teachersService.createVideoClass(teacherId, createVideoClassDto)
  }

  @UseGuards(JwtAuthGuard)
  @Post('issue')
  async createIssue(@Request() req, @Body() createIssueDto: CreateIssueDto) {
    const teacherId = req.user.userId;
    return this.teachersService.createIssue(teacherId, createIssueDto)
  }
}
