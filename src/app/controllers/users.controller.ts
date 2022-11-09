import { HttpCode, Param } from "@mozart/decorators";
import { Body } from "@mozart/decorators/Body";
import { Controller } from "@mozart/decorators/Controller";
import { Inject } from "@mozart/decorators/Inject";
import { Get, Post } from "@mozart/decorators/request";
import { IUser, UsersService } from "../services/users.service";

@Controller("/users")
export class UsersController {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService
  ) {}

  @Post("/")
  @HttpCode(201)
  add(@Body() user: Omit<IUser, "id">) {
    return this.usersService.addUser(user);
  }

  @Get("/:id")
  find(@Param() { id }: any) {
    return this.usersService.findUser(Number(id));
  }

  @Get("/")
  list() {
    return this.usersService.getUsers();
  }
}
