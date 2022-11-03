import "reflect-metadata";
import { AppModule } from "./app.module";
import { MozartFactory } from "./Mozart/Mozart.factory";

async function bootstrap() {
  const app = MozartFactory.create(AppModule);

  app.listen(3333, () => console.log("Server Started"));
}

bootstrap();
