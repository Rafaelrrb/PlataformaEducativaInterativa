import { Injectable } from '@nestjs/common';
import { Teacher, VideoClass } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateIssueDto } from 'src/issues/dto/creat-issue.dto';
import { CreateVideoClassDto } from 'src/video-classes/dto/creat-videoClass.dto';

@Injectable()
export class TeachersService {
  constructor(private readonly prisma: PrismaService) {}

  async findProfile(userId: string): Promise<Teacher > {
    return this.prisma.teacher.findUnique({
      where: { id: userId },
      include:{
        videoClasses: true,
        issues: true
      }
    });
  }

  async createVideoClass(teacherId: string, data: CreateVideoClassDto) {
    return this.prisma.videoClass.create({
      data: {
        ...data,
        teacherId,
      }
    });
  }

  async createIssue(teacherId: string, data: CreateIssueDto) {
    return this.prisma.issue.create({
      data: {
        ...data,
        teacherId,
      }
    });
  }
}
