export class LoginDto {
  email: string;
  password: string;
}

export class LoginResponseDto {
  token: string;
  email: string;
  name: string;
  nick_name: string;
}
