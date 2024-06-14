import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'prisma/prisma.service';
import { StudentsModule } from 'src/students/students.module';
import { LocalStrategy } from './local.strategy';
import { TeachersModule } from 'src/teachers/teachers.module';

@Module({
  imports: [
    StudentsModule, // Certifique-se de ter um módulo de usuários
    PassportModule,
    JwtModule.register({
      global: true,
      secret: 'yourSecretKey', // Substitua pela sua chave secreta
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, PrismaService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}