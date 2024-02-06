import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupDto, SignupResponseDto } from './dto/signup-collaborator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Collaborator } from './entities/collaborator.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { LoginDto, LoginResponseDto } from './dto/login-collaborator.dto';

@Injectable()
export class CollaboratorService {
  constructor(
    private readonly authService: AuthService,

    @InjectRepository(Collaborator)
    private collaboratorRepository: Repository<Collaborator>,
  ) {}

  async checkPassword(passInDB, passInReq): Promise<boolean> {
    return passInDB === passInReq;
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    try {
      if (!(await this.checkExistsByEmail(loginDto.email))) {
        throw new BadRequestException('이메일이 잘못됨');
      }
      const collaborator = await this.collaboratorRepository
        .createQueryBuilder()
        .select(['uuid', 'password', 'name', 'nick_name'])
        .where('email = :email', { email: loginDto.email })
        .getRawOne();

      if (
        !(await this.checkPassword(collaborator.password, loginDto.password))
      ) {
        throw new BadRequestException('비밀번호가 잘못됨');
      }

      const token = await this.authService.jwtLogin(
        collaborator.uuid,
        loginDto.email,
      );

      return {
        token,
        email: loginDto.email,
        name: collaborator.name,
        nick_name: collaborator.nick_name,
      };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async checkExistsByEmail(value: string): Promise<boolean> {
    return await this.collaboratorRepository
      .createQueryBuilder()
      .where('email = :value', { value })
      .getExists();
  }
  async checkExistsByPhoneNumber(value: string): Promise<boolean> {
    return await this.collaboratorRepository
      .createQueryBuilder()
      .where('phone_number = :value', { value })
      .getExists();
  }

  async signup(signupDto: SignupDto): Promise<SignupResponseDto> {
    try {
      await this.collaboratorRepository
        .createQueryBuilder()
        .insert()
        .into(Collaborator)
        .values(signupDto)
        .execute();
      return await this.collaboratorRepository
        .createQueryBuilder()
        .select(['name'])
        .where('email = :email', { email: signupDto.email })
        .getRawOne();
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e);
    }
  }

  // findAll() {
  //   return `This action returns all collaborator`;
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} collaborator`;
  // }
  //
  // update(id: number, updateCollaboratorDto: UpdateCollaboratorDto) {
  //   return `This action updates a #${id} collaborator`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} collaborator`;
  // }
}
