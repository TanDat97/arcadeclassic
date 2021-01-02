import { CoreRepo } from '../../core/service/repo';
import { TypeModel } from './model';
import { Constant } from '../../config/constant';

/**
 * @export
 * @class TypeRepo
 * @extends {CoreRepo}
 */
export class TypeRepo extends CoreRepo {
  /**
   * Creates an instance of CategoryRepo.
   * @memberof TypeRepo
   */
  constructor() {
    super(TypeModel, false);
  }

  getBaseConditionByRole() {
    const condition = {};
    condition.is_delete = Constant.INACTIVE;
    condition.is_active = Constant.ACTIVE;

    return condition;
  }
  
  /**
   * @param {*} condition
   * @returns
   * @memberof CoreRepo
   */
  findAllWithCondition(condition, select = "*") {
    const query = {
      ...this.getBaseConditionByRole(),
      ...condition,
      is_delete: Constant.INACTIVE,
      is_active: Constant.ACTIVE,
    };
    return this.model.find(query).select(select);
  }
}
