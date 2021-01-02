import _ from 'lodash';

import { Constant } from '../../config/constant';
import { AppError } from '../../core/errors';
import { CoreUsecase } from '../../core/service/usecase';
import { ProductRepo } from './repo';
import { ProductAdditionalInformationRepo } from '../productAdditional/repo';

/**
 * @export
 * @class ProductUsecase
 * @extends {CoreUsecase}
 */

export class ProductUsecase extends CoreUsecase {
  /**
   * Creates an instance of ProductUsecase.
   * @memberof ProductUsecase
   */
  constructor() {
    super(new ProductRepo());

    this.productAdditionalRepo = new ProductAdditionalInformationRepo();
    this.pickFields = [
      'type_business',
      'type',
      'name_product',
      'description',
      'images',
      'name',
      'email',
      'phone',
    ];
  }

  /**
   * Get list product with pagination
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
      type_business,
      type_uuid,
      area,
      bedroom,
      bathroom,
      furniture,
      project_uuid,
      district_uuid,
      city_uuid,
      country_uuid,
      area_from,
      area_to,
      price_from,
      price_to,
      language,
    } = params;
    const query = this._buildPaginateQuery({
      keyword,
      type_business,
      type_uuid,
      area,
      bedroom,
      bathroom,
      furniture,
      project_uuid,
      district_uuid,
      city_uuid,
      country_uuid,
      area_from,
      area_to,
      price_from,
      price_to,
      language,
    });
    query.client_uuid = client_uuid;
    const select =
      'uuid code type_business type_uuid slug name_product description price area bedroom bathroom furniture project_uuid location image lat long translate created_at';
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
      status: {
        $in: ['approved', 'sold', 'rented'],
      },
      $or: [],
    };
    query.$or.push({ slug: slug });
    let translate = 'translate.' + language + '.slug';
    query.$or.push({ [translate]: slug });
    const products = await this.repo.findAllWithCondition(query);
    const productAdditional = await this.productAdditionalRepo.findOneByProductUuid(
      products[0].uuid
    );

    return {
      product: products[0],
      productAdditional,
    };
  }

  _buildPaginateQuery({
    keyword,
    type_business,
    type_uuid,
    bedroom,
    project_uuid,
    district_uuid,
    city_uuid,
    country_uuid,
    bathroom,
    furniture,
    area_from,
    area_to,
    price_from,
    price_to,
    language,
  }) {
    const query = {
      is_delete: Constant.DEACTIVE,
      is_active: Constant.ACTIVE,
      status: {
        $in: ['approved', 'sold', 'rented'],
      },
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

    if (type_business) {
      query.type_business = type_business;
    }
    if (type_uuid) {
      query.type_uuid = type_uuid;
    }
    if (bedroom) {
      query.bedroom = bedroom;
    }
    if (project_uuid) {
      query.project_uuid = project_uuid;
    }
    if (district_uuid) {
      query.district_uuid = district_uuid;
    }
    if (city_uuid) {
      query.city_uuid = city_uuid;
    }
    if (country_uuid) {
      query.country_uuid = country_uuid;
    }

    if (Array.isArray(bathroom)) {
      query.bathroom = {
        $in: bathroom,
      };
    }
    if (Array.isArray(furniture)) {
      query.furniture = {
        $in: furniture,
      };
    }

    if (area_from) {
      query.area = {
        $gte: area_from,
      };
    } else if (area_to) {
      query.area = {
        $lte: area_to,
      };
    }
    if (area_from && area_to) {
      query.area = {
        $gte: area_from,
        $lte: area_to,
      };
    }
    if (price_from) {
      query.price = {
        $gte: price_from,
      };
    } else if (price_to) {
      query.price = {
        $lte: price_to,
      };
    }
    if (price_from && price_to) {
      query.price = {
        $gte: price_from,
        $lte: price_to,
      };
    }

    if (query.$or.length === 0) {
      delete query.$or;
    }

    return query;
  }
}
