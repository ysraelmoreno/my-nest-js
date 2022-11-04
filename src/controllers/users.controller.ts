import { Controller } from "../Mozart/decorators/Controller";
import { Query } from "../Mozart/decorators/Query";
import { Get } from "../Mozart/decorators/request";

@Controller("/users")
export class UsersController {
  constructor() {}

  @Get("/test")
  build() {
    return "Test";
  }
}
