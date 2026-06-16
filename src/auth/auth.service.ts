import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInCreadentials, SignUpCreadentials } from './dto/sign-up.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaClient: PrismaService,
    private supabaseClient: SupabaseService,
  ) {}

  async signUp(signUpCreadentials: SignUpCreadentials) {
    const { name, lastname, email, password } = signUpCreadentials;

    const { data, error } =
      await this.supabaseClient.client.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (error)
      throw new UnauthorizedException(
        ' something went wrong on creating the user',
      );

    const user = data.user;

    const unique_user = await this.prismaClient.user.create({
      data: {
        name,
        lastname,
        email: user.email || '',
        authUser: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    if (!unique_user) throw new UnauthorizedException('user not created');

    return await this.signIn({ email, password });
  }

  async signIn(signInCreadentials: SignInCreadentials) {
    const { email, password } = signInCreadentials;

    const { data, error } =
      await this.supabaseClient.client.auth.signInWithPassword({
        email,
        password,
      });

    if (error) throw new UnauthorizedException('user not found');

    const userId = data.user.id;
    const refresh_token = data.session.refresh_token;
    const access_token = data.session.access_token;

    const user = this.prismaClient.user.findUnique({
      where: {
        authUserId: userId,
      },
    });

    return {
      user,
      access_token,
      refresh_token,
    };
  }

  async me(id: string) {
    const user = await this.prismaClient.user.findUnique({
      where: {
        authUserId: id,
      },
    });

    if (!user) throw new UnauthorizedException('user not found');

    return user;
  }
}
