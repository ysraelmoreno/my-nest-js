import { Injectable } from "@mozart/decorators";

export interface IUser {
  id: number;
  name: string;
  password: string;
}

@Injectable()
export class UsersService {
  private users: IUser[] = [];
  constructor() {}

  addUser(user: Omit<IUser, "id">) {
    const newUser = {
      id: this.users.length + 1,
      ...user,
    };

    this.users.push(newUser);

    return newUser;
  }

  getUsers(): IUser[] {
    return this.users;
  }
}
