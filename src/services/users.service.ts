import { Injectable } from "@mozart/decorators";

@Injectable()
export class UsersService {
  private users: any[] = [];
  constructor() {}

  addUser(user: any) {
    this.users.push(user);

    return user;
  }

  getUsers() {
    return this.users;
  }
}
