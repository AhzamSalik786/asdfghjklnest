import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonDto } from 'common/common-response';
import { AuthCredentialsDto } from './Dto/auth-credentials-dto';
import { JwtPayload } from './jwt-payload-interface';
import { User } from './user.entity';
import { UserRepository } from './user.Repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ){}
    
    async signUp(authCredentialsDto: AuthCredentialsDto) :Promise <CommonDto> {
        return  await this.userRepository.signUp(authCredentialsDto)
    }
    async signIn(authCredentialsDto:AuthCredentialsDto): Promise<{ accessToken : string }> {
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);
        if(!username) {
            throw new UnauthorizedException('Invalid credential')
        }
        const payload : JwtPayload = {username};
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };

    }
}
