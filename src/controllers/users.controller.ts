import { Request } from "express";
import { Controller } from "../Mozart/decorators/Controller";
import { Req } from "../Mozart/decorators/Req";
import { Get } from "../Mozart/decorators/request";

@Controller("/users")
export class UsersController {
  constructor() {}

  @Get("test")
  build(@Req() test: Request) {
    return "Test";
  }
}
