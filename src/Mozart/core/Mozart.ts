import { MozartFactory } from "./Mozart.factory";

export class Mozart extends MozartFactory {
  static start(module: any) {
    return new this(module).create();
  }
}
