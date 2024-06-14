import { Injectable } from '@nestjs/common';
import { Issue, Student, VideoClass } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findProfile(userId: string): Promise<Student> {
    return this.prisma.student.findUnique({
      where: { id: userId },
    });
  }

  async findVideoClass(page: number, pageSize: number): Promise<VideoClass[]> {
    const skip = (page - 1) * pageSize;
    return this.prisma.videoClass.findMany({
      take: pageSize,
      skip: skip,
    });
  }

  async findIssue(page: number, pageSize: number): Promise<Issue[]> {
    const skip = (page - 1) * pageSize;
    return this.prisma.issue.findMany({
      take: pageSize,
      skip: skip,
    });
  }

  async updateVirtualCoins(id: string, virtualCoins: number): Promise<{ virtualCoins: number }> {
    return this.prisma.student.update({
      where: { id },
      data: virtualCoins ,
      select: { virtualCoins: true },
    });
  }

}
