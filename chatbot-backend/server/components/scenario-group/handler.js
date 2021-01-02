import { ScenarioGroupUsecase } from './usecase';
import { Common } from '../../helpers/common';
import { Constant } from '../../config/constant';
import { CoreHandler } from '../../core/service/handler';

/**
 * @export
 * @class ScenarioGroupHandler
 */
export class ScenarioGroupHandler extends CoreHandler {
  /**`
   * Creates an instance of ScenarioGroupHandler.
   * @memberof ScenarioGroupHandler
   */
  constructor() {
    super();
    this.scenarioGroupUsecase = new ScenarioGroupUsecase();
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
      const { user_id } = req.headers;
      const result = await this.scenarioGroupUsecase.getList(req.query, user_id);

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
      const { uuid } = req.params;
      const { user_id, language } = req.headers;
      const data = await this.scenarioGroupUsecase.getDetail(uuid, user_id, language);

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
