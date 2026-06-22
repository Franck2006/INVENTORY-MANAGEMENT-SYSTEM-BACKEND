import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInCreadentials, SignUpCreadentials } from './dto/sign-up.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signUpCreadentials: SignUpCreadentials) {
    return this.authService.signUp(signUpCreadentials);
  }

  @Post('sign-in')
  signIn(@Body() signInCreadentials: SignInCreadentials) {
    return this.authService.signIn(signInCreadentials);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  me(@Req() req: any) {
    const authUserId = req.user.authUserId;

    return this.authService.me(authUserId);
  }
}
