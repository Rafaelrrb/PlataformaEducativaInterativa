import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {

    const student = await this.prisma.student.findUnique({ where: { email } });
    const teacher = await this.prisma.teacher.findUnique({ where: { email } });

    const user = student || teacher;

    const role = student ? 'student' : 'teacher';

    if (user && (pass == user.password)) {
      const { password, ...result } = user;
      return {...result, role};
    }

    return null;
  }

  async signIn(email: string, password: string) {
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const payload = { email: user.email, userId: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}