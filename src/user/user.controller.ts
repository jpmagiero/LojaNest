import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { createUserDTO } from './dto/CreateUserDTO';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() userData: createUserDTO) {
    this.userRepository.save(userData);
    return userData;
  }

  @Get()
  async listUsers() {
    return this.userRepository.list();
  }
}
