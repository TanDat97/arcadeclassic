import { CoreRepo } from '../../core/service/repo';
import { Agent } from './model';
import { Constant } from '../../config/constant';

/**
 * @export
 * @class AgentRepo
 * @extends {CoreRepo}
 */
export class AgentRepo extends CoreRepo {
  /**
   * Creates an instance of CategoryRepo.
   * @memberof AgentRepo
   */
  constructor() {
    super(Agent, false);
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
   * @memberof AgentRepo
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
