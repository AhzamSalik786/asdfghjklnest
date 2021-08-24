import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonDto } from 'common/common-response';
import { AuthCredentialsDto } from './Dto/auth-credentials-dto';
import { User } from './user.entity';
import { UserRepository } from './user.Repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ){}
    
    async signUp(authCredentialsDto: AuthCredentialsDto) :Promise <CommonDto> {
        return  await this.userRepository.signUp(authCredentialsDto)
    }
    async signIn(authCredentialsDto:AuthCredentialsDto) {
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);
        if(!username) {
            throw new UnauthorizedException('Invalid credential')
        }

    }
}
