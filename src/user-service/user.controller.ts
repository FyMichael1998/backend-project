import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly user: UserService) {}

  @Post()
  async check_auth(@Body() body: { email: string; mdp: string;}) {
    const { email, mdp } = body;
    return this.user.checkAuthentification(email, mdp);
  }

}
