import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupDto, SignupResponseDto } from './dto/signup-collaborator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Collaborator } from './entities/collaborator.entity';
import { Brackets, Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { LoginDto, LoginResponseDto } from './dto/login-collaborator.dto';
import { InitDto } from './dto/init-collaborator.dto';
import * as bcrypt from 'bcrypt';
import { CollaboratorsForListDto } from './dto/list-collaborator.dto';

@Injectable()
export class CollaboratorService {
  constructor(
    private readonly authService: AuthService,

    @InjectRepository(Collaborator)
    private collaboratorRepository: Repository<Collaborator>,
  ) {}

  async checkPassword(passInDB: string, passInReq: string): Promise<boolean> {
    return await bcrypt.compare(passInReq, passInDB);
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
    } catch (err) {
      throw new BadRequestException(err);
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
      const { password, ...data } = signupDto;

      const salt = await bcrypt.genSalt();
      const encryptedPassword = await bcrypt.hash(password, salt);

      await this.collaboratorRepository
        .createQueryBuilder()
        .insert()
        .into(Collaborator)
        .values({ ...data, password: encryptedPassword })
        .execute();
      return await this.collaboratorRepository
        .createQueryBuilder()
        .select(['name'])
        .where('email = :email', { email: signupDto.email })
        .getRawOne();
    } catch (err) {
      throw new err();
    }
  }
  async updateProfileImage(uuid: string, imageFileName: string) {
    try {
      await this.collaboratorRepository
        .createQueryBuilder()
        .update(Collaborator)
        .set({ img_main_name: imageFileName })
        .where('uuid = :uuid', { uuid })
        .execute();
      return 'Ok';
    } catch (err) {
      return err;
    }
  }

  async initProfile(uuid: string, initDto: InitDto) {
    try {
      await this.collaboratorRepository
        .createQueryBuilder()
        .update(Collaborator)
        .set(initDto)
        .where('uuid = :uuid', { uuid })
        .execute();
      return 'Ok';
    } catch (err) {
      return err;
    }
  }

  async getRawOneByEmail(selection: string[], email: string) {
    try {
      return await this.collaboratorRepository
        .createQueryBuilder()
        .select(selection)
        .where('email = :email', { email })
        .getRawOne();
    } catch (err) {
      return err;
    }
  }

  async findCollaboratorsListByKeyword(
    uuid: string,
    keyword: string,
  ): Promise<CollaboratorsForListDto[]> {
    try {
      keyword = `%${keyword}%`;
      return await this.collaboratorRepository
        .createQueryBuilder()
        .select(['email', 'name', 'nick_name'])
        .where('uuid <> :uuid', { uuid })
        .andWhere(
          new Brackets((sub) => {
            sub
              .where('name like :keyword', { keyword })
              .orWhere('nick_name like :keyword', { keyword });
          }),
        )
        .getRawMany();
    } catch (err) {
      return err;
    }
  }
}
