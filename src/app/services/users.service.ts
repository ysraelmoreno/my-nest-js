import { Injectable } from "@mozart/decorators";

export interface IUser {
  id: number;
  name: string;
  password: string;
}

@Injectable()
export class UsersService {
  private users: IUser[] = [];

  findUser(id: number) {
    const findUser = this.users.filter((user) => user.id === id);

    console.log("findUser", findUser);
    return findUser;
  }

  addUser(user: Omit<IUser, "id">) {
    const newUser = {
      id: this.users.length + 1,
      ...user,
    };

    this.users = [...this.users, newUser];

    return newUser;
  }

  getUsers(): IUser[] {
    return this.users;
  }
}
