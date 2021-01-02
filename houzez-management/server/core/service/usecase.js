import { CoreRepo } from './repo';
import { AppError } from '../errors';
import { Context } from '../../helpers/context';

export class CoreUsecase {
  /**
   * Creates an instance of CoreUsecase.
   * @param {CoreRepo} repo
   * @memberof CoreUsecase
   */
  constructor(repo) {
    if (!(repo instanceof CoreRepo)) {
      throw new AppError('Wrong Repo Type', 500);
    }

    this.repo = repo;
    this.context = new Context();
  }

  /**
   * @param {string} uuid
   * @returns
   * @memberof CoreUsecase
   */
  findOne(uuid) {
    return this.repo.findOne(uuid);
  }

  findAll() {
    return this.repo.findAll();
  }

  /**
   * @param {*} fieldName
   * @param {*} value
   * @memberof CoreUsecase
   */
  async checkUnique(fieldName, value, exceptValue = null) {
    const result = await this.repo.findOneInClient(
      fieldName,
      value,
      exceptValue
    );
    if (result !== null) {
      throw new AppError(`${fieldName} is existed.`, 422);
    }

    return value;
  }

  /**
   * @param {string} fieldName
   * @param {string} value
   * @returns
   * @memberof CoreUsecase
   */
  async checkExist(fieldName, value) {
    const result = await this.repo.findOneByCondition(fieldName, value);
    if (result === null) {
      throw new AppError(`${fieldName} is not exist.`, 422);
    }

    return value;
  }

  /**
   * @param {*} uuid
   * @memberof CoreUsecase
   */
  async checkExistByUUID(uuid) {
    const result = await this.repo.findOne(uuid);
    if (result === null) {
      throw new AppError('Not exist', 404);
    }
  }

  /**
   * @param {*} uuid
   * @param {*} status
   * @returns
   * @memberof CoreUsecase
   */
  async updateStatus(uuid, status) {
    return this.repo.updateOne(uuid, {
      ...status,
      updated_by: this.context.currentUser.uuid,
      updated_at: new Date().toISOString(),
    });
  }

  /**
   * @param {array} uuids
   * @returns
   * @memberof CoreUsecase
   */
  async findByUUIDs(uuids) {
    return this.repo.findByUUIDs(uuids);
  }

  /**
   * @param {string} uuid
   * @returns
   * @memberof CoreUsecase
   */
  deleteOne(uuid) {
    return this.repo.deleteOne(uuid);
  }
}
