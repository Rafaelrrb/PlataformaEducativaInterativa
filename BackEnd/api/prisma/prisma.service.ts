import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient, Student, Teacher } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  constructor() {
    super();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // Métodos de estudantes
  async createStudent(data: Omit<Student, 'id'>): Promise<Student> {
    return this.student.create({ data });
  }

  async updateStudent(id: string, data: Partial<Omit<Student, 'id'>>): Promise<Student> {
    return this.student.update({
      where: { id },
      data,
    });
  }

  async removeStudent(id: string): Promise<Student> {
    return this.student.delete({
      where: { id }
    });
  }

  // Métodos de professor
  async createTeacher(data: Omit<Teacher, 'id'>): Promise<Teacher> {
    return this.teacher.create({ data });
  }

  async updateTeacher(id: string, data: Partial<Omit<Teacher, 'id'>>): Promise<Teacher> {
    return this.teacher.update({
      where: { id },
      data,
    });
  }

  async removeTeacher(id: string): Promise<Teacher> {
    return this.teacher.delete({
      where: { id }
    });
  }
}