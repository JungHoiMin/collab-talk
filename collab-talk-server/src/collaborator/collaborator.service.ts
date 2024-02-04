import { BadRequestException, Injectable } from "@nestjs/common";
import { SignupDto, SignupResponseDto } from './dto/signup-collaborator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Collaborator } from './entities/collaborator.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CollaboratorService {
  constructor(
    @InjectRepository(Collaborator)
    private collaboratorRepository: Repository<Collaborator>,
  ) {}

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
        .select(['uuid', 'name'])
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
