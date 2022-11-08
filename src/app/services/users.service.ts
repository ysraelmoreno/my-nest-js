import { Injectable } from "@mozart/decorators";

@Injectable()
export class UsersService {
  private users: any[] = [];
  constructor() {}

  addUser(user: any) {
    const newUser = {
      id: this.users.length + 1,
      ...user,
    };

    this.users.push(newUser);

    return newUser;
  }

  getUsers() {
    return this.users;
  }
}
