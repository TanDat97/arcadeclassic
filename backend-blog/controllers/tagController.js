const dbQuery = require('../db/dbQuery');
const { errorMessage, successMessage, status } = require('../utils/status');
const {
  isEmpty,
} = require('../utils/validation');

/**
   * Create A Role
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */

const getOneTag = async (req, res) => {
  const { tagId } = req.params;
  if (isEmpty(tagId)) {
    errorMessage.message = 'id is invalid';
    return res.status(status.bad).json(errorMessage);
  }
  const getOneTagQuery = 'SELECT * FROM tag WHERE id=$1';
  try {
    const { rows } = await dbQuery.query(getOneTagQuery, [tagId]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.status = status.notfound;
      errorMessage.message = 'Tag cannot be found';
      return res.status(status.notfound).json(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.success).json(successMessage);
  } catch (error) {
    errorMessage.message = 'Operation was not successful';
    return res.status(status.error).json(errorMessage);
  }
}

const createTag = async (req, res) => {
  const {
    name,
  } = req.body;
  const create_at = moment(new Date());
  const update_at = create_at;
  if (isEmpty(name)) {
    errorMessage.message = 'Name field cannot be empty';
    return res.status(status.bad).json(errorMessage);
  }
  const createTagQuery = `INSERT INTO
      users(name, create_at, update_at)
      VALUES($1, $2, $3)
      returning *`;
  const values = [
    name,
    create_at,
    update_at,
  ];
  try {
    const { rows } = await dbQuery.query(createTagQuery, values);
    const dbResponse = rows[0];
    delete dbResponse.password;
    successMessage.data = dbResponse;
    successMessage.status = status.created;
    return res.status(status.created).json(successMessage);
  } catch (error) {
    errorMessage.message = 'Operation was not successful';
    return res.status(status.error).json(errorMessage);
  }
}

const updateTag = async (req, res) => {
  const { tagId } = req.params;
  const { name } = req.body;
  if (isEmpty(tagId) || isEmpty(name)) {
    errorMessage.message = 'id or name is invalid';
    return res.status(status.bad).json(errorMessage);
  }
  const update_at = moment(new Date());
  const findTagQuery = 'SELECT * FROM tag WHERE id=$1';
  const updateTag = `UPDATE tag
        SET name=$1, update_at=$2 WHERE id=$3 returning *`;
  try {
    const { rows } = await dbQuery.query(findTagQuery, [tagId]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.status = status.notfound;
      errorMessage.message = 'Tag cannot be found';
      return res.status(status.notfound).json(errorMessage);
    }
    const values = [
      name,
      update_at,
    ];
    const response = await dbQuery.query(updateTag, values);
    const dbResult = response.rows[0];
    successMessage.data = dbResult;
    return res.status(status.success).json(successMessage);
  } catch (error) {
    errorMessage.message = 'Operation was not successful';
    return res.status(status.error).json(errorMessage);
  }
}

module.exports = {
  getOneTag,
  createTag,
  updateTag
}
