import { CoreRepo } from '../../core/service/repo';
import { ProductAdditionalInformationModel } from './model';
import { Constant } from '../../config/constant';

/**
 * @export
 * @class ProductAdditionalInformationRepo
 * @extends {CoreRepo}
 */
export class ProductAdditionalInformationRepo extends CoreRepo {
  /**
   * Creates an instance of CategoryRepo.
   * @memberof ProductAdditionalInformationRepo
   */
  constructor() {
    super(ProductAdditionalInformationModel, false);
  }

  findOneByProductUuid(productUuid, exceptUUID = null) {
    return this.model.findOne({
      product_uuid: productUuid,
      uuid: { $ne: exceptUUID },
      is_delete: Constant.DEACTIVE,
    });
  }

  /**
   *
   * @param { string[] }productUuids
   * @param { object }conditons
   * @param { string }select
   * @returns {*}
   */
  getWithProductUuids(productUuids, conditons, select = '*') {
    return this.findAllWithCondition({
      product_uuid: {
        $in: productUuids,
      },
      ...conditons,
      is_delete: Constant.INACTIVE,
    })
      .select(select)
      .lean();
  }
}
