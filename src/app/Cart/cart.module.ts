import { Module } from "@mozart/decorators";
import { CartController } from "./controllers/cart.controller";

@Module({
  imports: [],
  controllers: [CartController],
  providers: [],
})
export class CartModule {}
