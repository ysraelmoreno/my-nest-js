import { Body } from "../Mozart/decorators/Body";
import { Controller } from "../Mozart/decorators/Controller";
import { Get, Post } from "../Mozart/decorators/request";

@Controller("/users")
export class UsersController {
  constructor() {}

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
