export abstract class AbstractModel {
  protected DB;

  constructor() {
    this.DB = global.DB;
  }
}
