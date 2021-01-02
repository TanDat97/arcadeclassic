import { ProductUsecase } from './usecase';
import { Common } from '../../helpers/common';
import { Constant } from '../../config/constant';
import { CoreHandler } from '../../core/service/handler';

/**
 * @export
 * @class ProductHandler
 */
export class ProductHandler extends CoreHandler {
  /**`
   * Creates an instance of ProductHandler.
   * @memberof ProductHandler
   */
  constructor() {
    super();
    this.productUsecase = new ProductUsecase();
  }

  /**
   * Get list data with pagination
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<void>}
   */
  async getList(req, res, next) {
    try {
      const { client_id } = req.headers;
      const result = await this.productUsecase.getList(req.query, client_id);

      res.send({
        code: Constant.STATUS_SUCCESS,
        message: 'Get list data success',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async getDetail(req, res, next) {
    try {
      const { slug } = req.params;
      const { client_id, language } = req.headers;
      const data = await this.productUsecase.getDetail(
        slug,
        language,
        client_id
      );

      res.send({
        code: Constant.STATUS_SUCCESS,
        message: 'Get detail data success',
        data,
      });
    } catch (err) {
      next(err);
    }
  }
}
