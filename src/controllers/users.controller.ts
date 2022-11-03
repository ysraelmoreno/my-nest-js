import { Request, Response } from "express";
import { Controller } from "../Mozart/decorators/Controller";
import { Get } from "../Mozart/decorators/request";

@Controller("/users")
export class UsersController {
  constructor() {}

  @Get("test")
  build(req: Request, res: Response) {
    return "Test";
  }
}
