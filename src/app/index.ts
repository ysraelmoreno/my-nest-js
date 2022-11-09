import "reflect-metadata";
import { AppModule } from "./app.module";
import { Mozart } from "@mozart/core";

async function bootstrap() {
  const app = Mozart.start(AppModule);

  app.listen(3333, () => console.log("🐱‍🏍 Server Started"));
}

bootstrap();
