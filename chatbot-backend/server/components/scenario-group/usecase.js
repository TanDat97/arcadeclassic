import _ from 'lodash';

import { Constant } from '../../config/constant';
import { AppError } from '../../core/errors';
import { CoreUsecase } from '../../core/service/usecase';
import { ScenarioGroupRepo } from './repo';

/**
 * @export
 * @class ScenarioGroupUsecase
 * @extends {CoreUsecase}
 */

export class ScenarioGroupUsecase extends CoreUsecase {
  /**
   * Creates an instance of ScenarioGroupUsecase.
   * @memberof ScenarioGroupUsecase
   */
  constructor() {
    super(new ScenarioGroupRepo());

  }

  /**
   * Get list ScenarioGroup with pagination
   *
   * @param params
   * @returns {Promise<{items: *, total: (number|PaymentItem), limit: *, page: Number, pages: (*)}>}
   */
  async getList(params, user_uuid) {
    const {
      keyword,
      page,
      limit,
      sort,
      language,
    } = params;
    const query = this._buildPaginateQuery({
      keyword,
      language,
    });
    query.user_uuid = user_uuid;
    const select =
      'uuid agent_uuid name description translate created_at';
    const result = await this.repo.paginate(
      query,
      page,
      limit,
      sort !== 'default' ? sort : undefined,
      select,
      null,
      true
    );
    return {
      items: result.docs,
      total: result.total,
      limit: result.limit,
      page: result.page,
      pages: result.pages,
    };
  }

  async getDetail(uuid, user_uuid, language) {
    const query = {
      is_delete: Constant.DEACTIVE,
      is_active: Constant.ACTIVE,
      uuid,
      user_uuid,
    };

    const scenarioGroups = await this.repo.findAllWithCondition(query);

    return {
      scenarioGroup: scenarioGroups[0],
    };
  }

  _buildPaginateQuery({
    keyword,
    language,
  }) {
    const query = {
      is_delete: Constant.DEACTIVE,
      is_active: Constant.ACTIVE,
      $or: [],
    };

    if (keyword) {
      //const pattern = new RegExp(keyword, 'i');
      const pattern = new RegExp(keyword, 'i');
      query.$or.push({ slug: pattern });
      query.$or.push({ name: pattern });
      let translate = 'translate.' + language + '.name';
      query.$or.push({ [translate]: pattern });
    }

    if (query.$or.length === 0) {
      delete query.$or;
    }

    return query;
  }
}
