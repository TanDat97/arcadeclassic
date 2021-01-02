import _ from 'lodash';

import { Constant } from '../../config/constant';
import { AppError } from '../../core/errors';
import { CoreUsecase } from '../../core/service/usecase';
import { AgentRepo } from './repo';
import { ScenarioGroupRepo } from '../scenario-group/repo';

/**
 * @export
 * @class AgentUsecase
 * @extends {CoreUsecase}
 */

export class AgentUsecase extends CoreUsecase {
  /**
   * Creates an instance of AgentUsecase.
   * @memberof AgentUsecase
   */
  constructor() {
    super(new AgentRepo());
    this.pickFields = [
      'code',
      'name',
      'description',
      'translate',
      'is_active',
    ];
    this.scenarioGroupRepo = new ScenarioGroupRepo();
  }

  /**
   * Get list Agent with pagination
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
      'uuid name description translate created_at';
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

    const agents = await this.repo.findAllWithCondition(query);

    return {
      agent: agents[0],
    };
  }

    /**
   * @param {object} data
   * @memberof AgentUsecase
   */
  async create(request) {
    try {
      // const { uuid: created_by } = this.context.currentUser;
      const created_by = "";

      const data = {
        ..._.pick(request, this.pickFields),
        created_by,
      };

      const newAgent = await this.repo.create(data);

      // await this._upsertDefaultScenarioGroup(newAgent.uuid, false);

      return newZone;
    } catch (err) {
      console.log(err);
      throw err;
    }
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

    /**
   * @param {object} data
   * @param {string} agentUUID
   * @returns
   * @memberof ZonesUsecase
   */
  _upsertDefaultScenarioGroup(data, agentUUID, isUpdate = false) {
    if (!data || data.length === 0) {
      return null;
    }

    // const { uuid: created_by } = this.context.currentUser;
    const created_by = "";
    if (isUpdate) {
      return this.scenarioGroupRepo.updateScenarioGroup(data, agentUUID, created_by);
    }

    return this.scenarioGroupRepo.createDefaultScenarioGroup(agentUUID, created_by);
  }
}
