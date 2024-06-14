import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsService } from './students/students.service';
import { TeachersService } from './teachers/teachers.service';
import { VideoClassesService } from './video-classes/video-classes.service';
import { IssuesService } from './issues/issues.service';
import { StudentsController } from './students/students.controller';
import { TeachersController } from './teachers/teachers.controller';
import { VideoClassesController } from './video-classes/video-classes.controller';
import { IssuesController } from './issues/issues.controller';
import { AdministratorService } from './administrator/administrator.service';
import { AdministratorController } from './administrator/administrator.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { TeachersModule } from './teachers/teachers.module';

@Module({
  imports: [PrismaModule, AuthModule, StudentsModule,TeachersModule],
  controllers: [AppController, StudentsController, TeachersController, VideoClassesController, IssuesController, AdministratorController,AuthController],
  providers: [AppService, StudentsService, TeachersService, VideoClassesService, IssuesService, AdministratorService,AuthService],
})
export class AppModule {}
