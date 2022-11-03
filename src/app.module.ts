import { UsersController } from "./controllers/users.controller";
import { Module } from "./Mozart/decorators/Module";

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
