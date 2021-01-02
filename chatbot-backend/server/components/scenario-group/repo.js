import { CoreRepo } from '../../core/service/repo';
import { ScenarioGroup } from './model';
import { Constant } from '../../config/constant';

/**
 * @export
 * @class ScenarioGroupRepo
 * @extends {CoreRepo}
 */
export class ScenarioGroupRepo extends CoreRepo {
  /**
   * Creates an instance of CategoryRepo.
   * @memberof ScenarioGroupRepo
   */
  constructor() {
    super(ScenarioGroup, false);
  }

  getBaseConditionByRole() {
    const condition = {};
    condition.is_active = Constant.ACTIVE;
    condition.is_delete = Constant.INACTIVE;

    return condition;
  }
  
  /**
   * @param {*} condition
   * @returns
   * @memberof ScenarioGroupRepo
   */
  findAllWithCondition(condition, select = "*") {
    const query = {
      ...this.getBaseConditionByRole(),
      ...condition,
      is_active: Constant.ACTIVE,
    };
    return this.model.find(query).select(select);
  }
}
