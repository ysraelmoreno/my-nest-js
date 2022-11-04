import { Controller } from "../Mozart/decorators/Controller";
import { Get } from "../Mozart/decorators/request";

@Controller("/users")
export class UsersController {
  constructor() {}

  @Get("/test/:id")
  build() {
    return "Test";
  }
}
