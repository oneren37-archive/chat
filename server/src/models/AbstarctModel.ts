import { DB } from '../tools/db';

export abstract class AbstractModel {
  protected DB;

  protected constructor() {
    this.DB = new DB();
  }
}
