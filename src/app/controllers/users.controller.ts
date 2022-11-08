import { Body } from "@mozart/decorators/Body";
import { Controller } from "@mozart/decorators/Controller";
import { Inject } from "@mozart/decorators/Inject";
import { Get, Post } from "@mozart/decorators/request";
import { UsersService } from "../services/users.service";

@Controller("/users")
export class UsersController {
  constructor(@Inject(UsersService) private readonly usersService: any) {}

  @Post("/")
  add(@Body() user: any) {
    return this.usersService.addUser(user);
  }

  @Get("/")
  list() {
    return this.usersService.getUsers();
  }
}
