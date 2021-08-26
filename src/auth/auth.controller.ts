import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './Dto/auth-credentials-dto';
import {AuthService }from './auth.service';
import { CommonDto } from 'common/common-response';
@Controller('auth')
export class AuthController {
    constructor(
        private authService : AuthService,
    ) {}
    @Post('/signup')
    async signUp(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto):Promise <CommonDto>{
        return await this.authService.signUp(authCredentialsDto);
    }
    
    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto):Promise <{accessToken : string}>{
        return this.authService.signIn(authCredentialsDto);
    }
}
