import { Injectable } from "../Mozart/decorators/Injectable";

@Injectable()
export class UsersService {
  constructor() {}

  getData() {
    return "Data";
  }
}
