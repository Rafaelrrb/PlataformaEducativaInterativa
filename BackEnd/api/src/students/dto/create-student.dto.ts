export class CreateStudentDto {
  readonly email: string;
  readonly name : string;
  readonly password : string;
  readonly institution: string;
  readonly virtualCoins: number;
}
