import { UsersController } from "./controllers/users.controller";
import { Module } from "@mozart/decorators";
import { UsersService } from "./services/users.service";
import { CartModule } from "./Cart/cart.module";

@Module({
  imports: [CartModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
