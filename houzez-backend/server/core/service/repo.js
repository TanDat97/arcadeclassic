import { Constant } from '../../config/constant';
import { Context } from '../../helpers/context';
import { AppError } from '../errors';

/**
 * @export
 * @class CoreRepo
 */
export class CoreRepo {
  /**
   * Creates an instance of CoreRepo.
   * @param {*} model
   * @param {boolean} [filterByStore=false]
   * @param {string} [storeFieldName='stores']
   * @memberof CoreRepo
   */
  constructor(model, filterByStore = false, storeFieldName = 'stores.uuid') {
    if (typeof model.modelName === 'undefined') {
      throw new AppError('Incorrect model type');
    }

    this.model = model;
    this.filterByStore = filterByStore;
    this.storeFieldName = storeFieldName;
    this.context = new Context();
  }

  /**
   * Get condition by user role
   * @returns
   * @memberof CoreRepo
   */
  getBaseConditionByRole() {
    const cond = {};
    condition.is_delete = Constant.INACTIVE;
    condition.is_active = Constant.ACTIVE;

    return cond;
  }

  /**
   * @param {array} uuids
   * @param {boolean} [onlyCommonFieds=false]
   * @returns
   * @memberof DemoRepo
   */
  getByUUIDs(uuids, onlyCommonFieds = false) {
    const results = this.model.find({
      uuid: { $in: uuids },
      is_delete: Constant.INACTIVE,
    });
    if (onlyCommonFieds) {
      results.select('uuid name code');
    }
    return results;
  }

  _isApplyFilter() {
    const user = this.context.currentUser;
    const code = Constant.SUPER_ADMIN_CODE;

    return !(
      Array.isArray(user.roles) &&
      user.roles.findIndex(r => r.code === code) >= 0
    );
  }

  /**
   * @param {string} uuid
   * @returns Document
   * @memberof CoreRepo
   */
  findOne(uuid) {
    const condition = this.getBaseConditionByRole();
    condition.uuid = uuid;
    condition.is_delete = Constant.INACTIVE;

    return this.model.findOne(condition);
  }

  /**
   * @param {string} field
   * @param {string} value
   * @param {string} exceptValue
   * @returns
   * @memberof CoreRepo
   */
  findOneByCondition(field, value, exceptUUID = null) {
    const condition = this.getBaseConditionByRole();
    condition.is_delete = Constant.INACTIVE;
    condition[field] = value;
    if (exceptUUID !== null) {
      condition.uuid = { $ne: exceptUUID };
    }

    return this.model.findOne(condition);
  }

  /**
   * Find in collection without filter store
   * @param {*} field
   * @param {*} value
   * @param {*} [exceptUUID=null]
   * @returns
   * @memberof CoreRepo
   */
  findOneByConditionInAll(field, value, exceptUUID = null) {
    const condition = { [field]: value, is_delete: Constant.INACTIVE };
    if (exceptUUID !== null) {
      condition.uuid = { $ne: exceptUUID };
    }

    return this.model.findOne(condition);
  }

  /**
   * @param {*} field
   * @param {*} value
   * @param {*} [exceptUUID=null]
   * @returns
   * @memberof CoreRepo
   */
  findOneInClient(field, value, exceptUUID = null) {
    const condition = { [field]: value, is_delete: Constant.INACTIVE };
    condition.client_uuid = this.context.currentUser.client_uuid;
    if (exceptUUID !== null) {
      condition.uuid = { $ne: exceptUUID };
    }

    return this.model.findOne(condition);
  }

  /**
   * Find in collection without filter store
   *
   * @param {*} uuid
   * @returns
   * @memberof CoreRepo
   */
  findOneInAll(uuid) {
    return this.model.findOne({ uuid, is_delete: Constant.INACTIVE });
  }

  /**
   * @param {array} uuids
   * @returns
   * @memberof CoreRepo
   */
  findByUUIDs(uuids) {
    const condition = this.getBaseConditionByRole();
    condition.is_delete = Constant.INACTIVE;
    condition.uuid = { $in: uuids };

    return this.model.find(condition);
  }

  /**
   * @returns Document[]
   * @memberof CoreRepo
   */
  findAll() {
    const condition = this.getBaseConditionByRole();
    condition.is_delete = Constant.INACTIVE;
    condition.is_active = Constant.ACTIVE;

    return this.model.find(condition);
  }

  /**
   * @param {*} condition
   * @returns
   * @memberof CoreRepo
   */
  findAllWithCondition(condition, select = "*") {
    const query = {
      ...this.getBaseConditionByRole(),
      ...condition,
      is_delete: Constant.INACTIVE,
      is_active: Constant.ACTIVE,
    };

    return this.model.find(query).lean();
  }

  /**
   * @param {*} query
   * @param {number} [page=1]
   * @param {number} [limit=10]
   * @returns object
   * @memberof CoreRepo
   */
  paginate(query, page = 1, limit = 15, sort = 'index -created_at', select = null, populate = null, lean = false) {
    const condition = { ...this.getBaseConditionByRole(), ...query };
    condition.is_delete = Constant.INACTIVE;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sort,
      lean: lean,
    };
    if (populate !== null) {
      options.populate = populate;
    }

    if (lean !== null) {
      options.lean = lean;
    }

    if (select !== null) {
      options.select = select;
    }

    return this.model.paginate(condition, options);
  }

  /**
   * @param {*} data
   * @returns
   * @memberof CoreRepo
   */
  create(data) {
    return this.model.create(data);
  }

  /**
   * @param {*} data
   * @returns
   * @memberof CoreRepo
  */
  bulkCreate(arrData) {
    return this.model.insertMany(arrData);
  }

  /**
   * @returns Document[]
   * @memberof CoreRepo
   */
  distinct(field, condition) {
    const query = { ...this.getBaseConditionByRole(), ...condition };
    query.is_delete = Constant.INACTIVE;
    query.is_active = Constant.ACTIVE;
    return this.model.distinct(field, condition);
  }

}
