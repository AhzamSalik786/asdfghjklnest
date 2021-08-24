import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CommonDto } from 'common/common-response';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './Dto/auth-credentials-dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<CommonDto> {
    //    const user = new User();
    //    user.username = username;
    //    user.password = password;
    try {
    //   let { username, password } = authCredentialsDto;

      const user = await this.findOne({ where: { username: authCredentialsDto.username } });
      if (user) {
        throw new BadRequestException(`${authCredentialsDto.username } is already exist.`);
      }
      const salt = await bcrypt.genSalt();
      console.log(salt);
      const hashing = await this.hashpassword(authCredentialsDto.password , salt);
      authCredentialsDto.password = hashing;
      authCredentialsDto.salt = salt;
      const abc = await this.save(authCredentialsDto);
      console.log(abc);

      // return await abc;

      return { data: abc };
    } catch (error) {
      //    console.log(error.code)
      throw new InternalServerErrorException(error);
    }
  }

   async validateUserPassword (authCredentialsDto: AuthCredentialsDto): Promise<string>{
    const {username, password}= authCredentialsDto;
    const user = await this.findOne({username});

    if(user && await user.validatePassword(password)){
      return user.username;
    } else {
      return null;
    }
  }

  private async hashpassword (password: string, salt: string){
    return bcrypt.hash(password, salt);
  }
}
