import { UsersController } from "./controllers/users.controller";
import { Module } from "@mozart/decorators";
import { UsersService } from "./services/users.service";

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
