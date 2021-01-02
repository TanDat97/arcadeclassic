import _ from 'lodash';

import { Constant } from '../../config/constant';
import { AppError } from '../../core/errors';
import { CoreUsecase } from '../../core/service/usecase';
import { ProjectRepo } from './repo';
import { OriginRepo } from '../origin/repo';
import { TypeRepo } from '../type/repo';

/**
 * @export
 * @class ProjectUsecase
 * @extends {CoreUsecase}
 */

export class ProjectUsecase extends CoreUsecase {
  /**
   * Creates an instance of ProjectUsecase.
   * @memberof ProjectUsecase
   */
  constructor() {
    super(new ProjectRepo());

    this.originRepo = new OriginRepo();
    this.typeRepo = new TypeRepo();
  }

  /**
   * Get list project with pagination
   *
   * @param params
   * @returns {Promise<{items: *, total: (number|PaymentItem), limit: *, page: Number, pages: (*)}>}
   */
  async getList(params, client_uuid) {
    const {
      keyword,
      page,
      limit,
      sort,
      status,
      language,
    } = params;
    const query = this._buildPaginateQuery({
      keyword,
      status,
      language,
    });
    query.client_uuid = client_uuid;
    const select =
      'uuid status slug name description location image lat long translate created_at';
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

  async getDetail(slug, language, client_uuid) {
    const query = {
      is_delete: Constant.DEACTIVE,
      is_active: Constant.ACTIVE,
      client_uuid,
      $or: [],
    };
    query.$or.push({ slug: slug });
    let translate = 'translate.' + language + '.slug';
    query.$or.push({ [translate]: slug });
    const projects = await this.repo.findAllWithCondition(query);

    return {
      project: projects[0],
    };
  }

  async getDataFilter(client_uuid) {
    const query = {
      is_show_filter: Constant.ACTIVE,
      client_uuid,
    }
    const select = "uuid name description sequence code translate type"
    const projects = await this.repo.findAllWithCondition(query, select);
    const types = await this.typeRepo.findAllWithCondition(query, select);
    const origins = await this.originRepo.findAllWithCondition(query, select);

    return {
      projects,
      types,
      origins,
    }
  }

  _buildPaginateQuery({
    keyword,
    status,
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

    if (status && status !== 'default') {
      query.status = status;
    }

    if (query.$or.length === 0) {
      delete query.$or;
    }

    return query;
  }
}
