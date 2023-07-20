import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async list() {
    return this.users;
  }

  private findById(id: string) {
    const possibleUser = this.users.find(
      savedUser => savedUser.id === id
    );

    if (!possibleUser) {
      throw new Error('User does not exist');
    }

    return possibleUser;
  }

  async update(id: string, updateData: Partial<UserEntity>) {

    const user = this.findById(id);

    Object.entries(updateData).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      user[key] = value;
    });

    return user;
  }

  async delete(id: string) {
    const user = this.findById(id);

    this.users = this.users.filter(
      saveUser => saveUser.id !== id
    );

    return user;
  }

  async emailExists(email: string) {
    const user = this.users.find(
      user => user.email === email
    );

    return user !== undefined;
  }
}
