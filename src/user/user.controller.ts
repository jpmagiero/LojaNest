import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { createUserDTO } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { UserListDTO } from './dto/ userList.dto';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) { }

  @Post()
  async createUser(@Body() userData: createUserDTO) {
    const userEntity = new UserEntity();
    userEntity.id = uuid();
    userEntity.name = userData.name;
    userEntity.email = userData.email;
    userEntity.password = userData.password;

    this.userRepository.save(userEntity);
    return {
      user: new UserListDTO(userEntity.id, userEntity.name),
      message: 'User created successfully'
    };
  }

  @Get()
  async listUsers() {
    const savedUsers = await this.userRepository.list();
    const userList = savedUsers.map(
      user => new UserListDTO(
        user.id,
        user.name
      )
    );
    return userList;
  }
}
