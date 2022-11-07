import { Body } from "../Mozart/decorators/Body";
import { Controller } from "../Mozart/decorators/Controller";
import { Inject } from "../Mozart/decorators/Inject";
import { Get, Post } from "../Mozart/decorators/request";
import { UsersService } from "../services/users.service";

@Controller("/users")
export class UsersController {
  constructor(@Inject(UsersService) private readonly usersService: any) {}

  @Post("/")
  test(@Body() body: any) {
    return {
      body,
    };
  }

  @Get("/")
  build() {
    return {
      ok: true,
    };
  }
}
