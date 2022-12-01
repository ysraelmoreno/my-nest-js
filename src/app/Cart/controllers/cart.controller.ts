import { Controller, Get } from "@mozart/decorators";

@Controller("/cart")
export class CartController {
  @Get()
  list() {
    return [
      {
        id: 1,
        item: "Test",
      },
    ];
  }
}
