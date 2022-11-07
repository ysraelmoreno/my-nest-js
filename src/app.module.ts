import { UsersController } from "./controllers/users.controller";
import { Inject } from "./Mozart/decorators/Inject";
import { Module } from "./Mozart/decorators/Module";
import { UsersService } from "./services/users.service";

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
