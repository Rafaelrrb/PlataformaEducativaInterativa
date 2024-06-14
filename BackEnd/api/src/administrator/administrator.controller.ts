import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateStudentDto } from 'src/students/dto/create-student.dto';
import { UpdateStudentDto } from 'src/students/dto/update-student.dto';
import { CreateTeacherDto } from 'src/teachers/dto/create-teacher.dto';
import { UpdateTeacherDto } from 'src/teachers/dto/update-teacher.dto';

@Controller('administrator')
export class AdministratorController {
  constructor(private readonly prisma: PrismaService) {}
  
  // Métodos de estudantes
  @Post('students')
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.prisma.student.create({ data: createStudentDto });
  }

  @Put('students/:id')
  async updateStudent(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.prisma.updateStudent(id, updateStudentDto);
  }

  @Delete('students/:id')
  async removeStudent(@Param('id') id: string) {
    return this.prisma.removeStudent(id);
  }

  // Métodos de professor
  @Post('teachers')
  async createTeachers(@Body() createTeacherDto: CreateTeacherDto) {
    return this.prisma.teacher.create({ data: createTeacherDto });
  }

  @Put('teachers/:id')
  async updateTeacher(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.prisma.updateTeacher(id, updateTeacherDto);
  }

  @Delete('teachers/:id')
  async removeTeacher(@Param('id') id: string) {
    return this.prisma.removeTeacher(id);
  }
}
