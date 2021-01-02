import { constant } from 'lodash';
import { Constant } from '../../config/constant';
import { CoreRepo } from '../../core/service/repo';
import { ProductModel } from './model';

/**
 * @export
 * @class ProductRepo
 * @extends {CoreRepo}
 */
export class ProductRepo extends CoreRepo {
  /**
   * Creates an instance of ProductRepo.
   * @memberof ProductRepo
   */
  constructor() {
    super(ProductModel);
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
  findAllWithCondition(condition) {
    const query = {
      ...this.getBaseConditionByRole(),
      ...condition,
      is_delete: Constant.INACTIVE,
      is_active: Constant.ACTIVE,
    };
    return this.model.find(query);
  }
}
