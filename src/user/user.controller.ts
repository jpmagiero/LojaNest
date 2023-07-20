import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { UserListDTO } from './dto/ userList.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) { }

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
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

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newData: UpdateUserDTO) {
    const userUpdated = await this.userRepository.update(id, newData);

    return {
      user: userUpdated,
      message: 'User updated successfully'
    }
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string){
    const userDeleted = await this.userRepository.delete(id);

    return {
      user: userDeleted,
      message: 'User delete successfully'
    }
  }
}
